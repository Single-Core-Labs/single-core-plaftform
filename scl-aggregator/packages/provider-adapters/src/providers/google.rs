use std::env;

use async_trait::async_trait;
use futures::{StreamExt, stream::BoxStream};
use reqwest::Client;
use serde::{Deserialize, Serialize};

use crate::traits::{ChunkStream, ProviderAdapter};
use crate::types::{ModelInfo, ProviderError, UnifiedChunk, UnifiedRequest, UnifiedResponse, Usage};

#[derive(Serialize)]
struct GeminiRequest {
    contents: Vec<GeminiContent>,
    #[serde(rename = "generationConfig", skip_serializing_if = "Option::is_none")]
    generation_config: Option<GeminiConfig>,
}

#[derive(Serialize)]
struct GeminiContent {
    role: String,
    parts: Vec<GeminiPart>,
}

#[derive(Serialize)]
struct GeminiPart {
    text: String,
}

#[derive(Serialize)]
struct GeminiConfig {
    #[serde(skip_serializing_if = "Option::is_none")]
    temperature: Option<f32>,
    #[serde(rename = "maxOutputTokens", skip_serializing_if = "Option::is_none")]
    max_output_tokens: Option<u32>,
}

#[derive(Deserialize)]
struct GeminiResponse {
    candidates: Option<Vec<GeminiCandidate>>,
    #[serde(rename = "usageMetadata")]
    usage_metadata: Option<GeminiUsage>,
}

#[derive(Deserialize)]
struct GeminiCandidate {
    content: Option<GeminiContentResponse>,
}

#[derive(Deserialize)]
struct GeminiContentResponse {
    parts: Option<Vec<GeminiPartResponse>>,
}

#[derive(Deserialize)]
struct GeminiPartResponse {
    text: Option<String>,
}

#[derive(Deserialize)]
struct GeminiUsage {
    #[serde(rename = "promptTokenCount")]
    prompt_token_count: u32,
    #[serde(rename = "candidatesTokenCount")]
    candidates_token_count: u32,
}

pub struct GoogleAdapter {
    client: Client,
    api_key: String,
    base_url: String,
}

impl GoogleAdapter {
    pub fn new() -> Result<Self, ProviderError> {
        let api_key = env::var("GOOGLE_API_KEY")
            .map_err(|_| ProviderError::ApiKeyMissing("GOOGLE_API_KEY".to_string()))?;
        
        let base_url = env::var("GOOGLE_BASE_URL")
            .unwrap_or_else(|_| "https://generativelanguage.googleapis.com/v1beta/models".to_string());

        let client = Client::builder()
            .build()
            .map_err(ProviderError::RequestFailed)?;

        Ok(Self { client, api_key, base_url })
    }

    fn to_gemini_req(req: &UnifiedRequest) -> GeminiRequest {
        let mut has_config = false;
        let config = GeminiConfig {
            temperature: req.temperature,
            max_output_tokens: req.max_tokens,
        };
        if config.temperature.is_some() || config.max_output_tokens.is_some() {
            has_config = true;
        }

        GeminiRequest {
            contents: req.messages.iter().map(|m| {
                let role = if m.role == "assistant" { "model" } else { "user" };
                GeminiContent {
                    role: role.to_string(),
                    parts: vec![GeminiPart { text: m.content.clone() }],
                }
            }).collect(),
            generation_config: if has_config { Some(config) } else { None },
        }
    }
}

#[async_trait]
impl ProviderAdapter for GoogleAdapter {
    async fn complete(&self, request: &UnifiedRequest) -> Result<UnifiedResponse, ProviderError> {
        let url = format!("{}/{}:generateContent?key={}", self.base_url, request.model, self.api_key);
        let gemini_req = Self::to_gemini_req(request);

        let resp = self.client.post(&url)
            .json(&gemini_req)
            .send()
            .await?;

        if !resp.status().is_success() {
            let err_text = resp.text().await.unwrap_or_default();
            return Err(ProviderError::ApiError(format!("Google API error: {}", err_text)));
        }

        let gemini_res: GeminiResponse = resp.json().await?;

        let content = gemini_res.candidates.as_ref()
            .and_then(|c| c.first())
            .and_then(|c| c.content.as_ref())
            .and_then(|c| c.parts.as_ref())
            .and_then(|p| p.first())
            .and_then(|p| p.text.clone())
            .unwrap_or_default();

        let usage = gemini_res.usage_metadata.map(|u| Usage {
            prompt_tokens: u.prompt_token_count,
            completion_tokens: u.candidates_token_count,
        }).unwrap_or_default();

        Ok(UnifiedResponse {
            content,
            model: request.model.clone(),
            usage,
        })
    }

    async fn stream(&self, request: &UnifiedRequest) -> Result<ChunkStream, ProviderError> {
        let url = format!("{}/{}:streamGenerateContent?alt=sse&key={}", self.base_url, request.model, self.api_key);
        let gemini_req = Self::to_gemini_req(request);

        let resp = self.client.post(&url)
            .json(&gemini_req)
            .send()
            .await?;

        if !resp.status().is_success() {
            let err_text = resp.text().await.unwrap_or_default();
            return Err(ProviderError::ApiError(format!("Google API error: {}", err_text)));
        }

        let stream = resp.bytes_stream().map(|chunk_res| {
            let chunk = chunk_res.map_err(ProviderError::RequestFailed)?;
            let text = String::from_utf8_lossy(&chunk);
            
            let mut content_delta = String::new();
            for line in text.lines() {
                if line.starts_with("data: ") {
                    let data = &line[6..];
                    if let Ok(res) = serde_json::from_str::<GeminiResponse>(data) {
                        if let Some(candidates) = res.candidates {
                            if let Some(first) = candidates.first() {
                                if let Some(content) = &first.content {
                                    if let Some(parts) = &content.parts {
                                        if let Some(part) = parts.first() {
                                            if let Some(t) = &part.text {
                                                content_delta.push_str(t);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            Ok(UnifiedChunk { content_delta })
        });

        Ok(Box::pin(stream))
    }

    fn name(&self) -> &'static str {
        "google"
    }

    fn models(&self) -> Vec<ModelInfo> {
        vec![
            ModelInfo {
                id: "gemini-2.5-pro".to_string(),
                context_window: 2000000,
                input_cost_per_1k: 0.00125,
                output_cost_per_1k: 0.005,
            },
            ModelInfo {
                id: "gemini-2.5-flash".to_string(),
                context_window: 1000000,
                input_cost_per_1k: 0.000075,
                output_cost_per_1k: 0.0003,
            },
        ]
    }
}
