use std::env;

use async_trait::async_trait;
use futures::{StreamExt, stream::BoxStream};
use reqwest::{Client, header};
use serde::{Deserialize, Serialize};

use crate::traits::{ChunkStream, ProviderAdapter};
use crate::types::{ModelInfo, ProviderError, UnifiedChunk, UnifiedRequest, UnifiedResponse, Usage};

// Redefining structs to avoid internal dependencies
#[derive(Serialize)]
struct OpenAiRequest {
    model: String,
    messages: Vec<OpenAiMessage>,
    #[serde(skip_serializing_if = "Option::is_none")]
    temperature: Option<f32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    max_tokens: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    stream: Option<bool>,
}

#[derive(Serialize)]
struct OpenAiMessage {
    role: String,
    content: String,
}

#[derive(Deserialize)]
struct OpenAiResponse {
    choices: Vec<Choice>,
    usage: Option<OpenAiUsage>,
}

#[derive(Deserialize)]
struct Choice {
    message: Option<OpenAiMessageResponse>,
    delta: Option<OpenAiMessageResponse>,
}

#[derive(Deserialize)]
struct OpenAiMessageResponse {
    content: Option<String>,
}

#[derive(Deserialize)]
struct OpenAiUsage {
    prompt_tokens: u32,
    completion_tokens: u32,
}

pub struct TogetherAdapter {
    client: Client,
    api_key: String,
    base_url: String,
}

impl TogetherAdapter {
    pub fn new() -> Result<Self, ProviderError> {
        let api_key = env::var("TOGETHER_API_KEY")
            .map_err(|_| ProviderError::ApiKeyMissing("TOGETHER_API_KEY".to_string()))?;
        
        let base_url = env::var("TOGETHER_BASE_URL")
            .unwrap_or_else(|_| "https://api.together.xyz/v1".to_string());

        let mut headers = header::HeaderMap::new();
        let auth_value = format!("Bearer {}", api_key);
        let mut auth_header = header::HeaderValue::from_str(&auth_value)
            .map_err(|_| ProviderError::ApiError("Invalid API key format".to_string()))?;
        auth_header.set_sensitive(true);
        headers.insert(header::AUTHORIZATION, auth_header);

        let client = Client::builder()
            .default_headers(headers)
            .build()
            .map_err(ProviderError::RequestFailed)?;

        Ok(Self { client, api_key, base_url })
    }

    fn to_openai_req(req: &UnifiedRequest) -> OpenAiRequest {
        OpenAiRequest {
            model: req.model.clone(),
            messages: req.messages.iter().map(|m| OpenAiMessage {
                role: m.role.clone(),
                content: m.content.clone(),
            }).collect(),
            temperature: req.temperature,
            max_tokens: req.max_tokens,
            stream: req.stream,
        }
    }
}

#[async_trait]
impl ProviderAdapter for TogetherAdapter {
    async fn complete(&self, request: &UnifiedRequest) -> Result<UnifiedResponse, ProviderError> {
        let url = format!("{}/chat/completions", self.base_url);
        let openai_req = Self::to_openai_req(request);

        let resp = self.client.post(&url)
            .json(&openai_req)
            .send()
            .await?;

        if !resp.status().is_success() {
            let err_text = resp.text().await.unwrap_or_default();
            return Err(ProviderError::ApiError(format!("Together API error: {}", err_text)));
        }

        let openai_res: OpenAiResponse = resp.json().await?;

        let content = openai_res.choices.first()
            .and_then(|c| c.message.as_ref())
            .and_then(|m| m.content.clone())
            .unwrap_or_default();

        let usage = openai_res.usage.map(|u| Usage {
            prompt_tokens: u.prompt_tokens,
            completion_tokens: u.completion_tokens,
        }).unwrap_or_default();

        Ok(UnifiedResponse {
            content,
            model: request.model.clone(),
            usage,
        })
    }

    async fn stream(&self, request: &UnifiedRequest) -> Result<ChunkStream, ProviderError> {
        let url = format!("{}/chat/completions", self.base_url);
        let mut openai_req = Self::to_openai_req(request);
        openai_req.stream = Some(true);

        let resp = self.client.post(&url)
            .json(&openai_req)
            .send()
            .await?;

        if !resp.status().is_success() {
            let err_text = resp.text().await.unwrap_or_default();
            return Err(ProviderError::ApiError(format!("Together API error: {}", err_text)));
        }

        let stream = resp.bytes_stream().map(|chunk_res| {
            let chunk = chunk_res.map_err(ProviderError::RequestFailed)?;
            let text = String::from_utf8_lossy(&chunk);
            
            let mut content_delta = String::new();
            for line in text.lines() {
                if line.starts_with("data: ") {
                    let data = &line[6..];
                    if data == "[DONE]" { continue; }
                    if let Ok(res) = serde_json::from_str::<OpenAiResponse>(data) {
                        if let Some(choice) = res.choices.first() {
                            if let Some(delta) = &choice.delta {
                                if let Some(content) = &delta.content {
                                    content_delta.push_str(content);
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
        "together"
    }

    fn models(&self) -> Vec<ModelInfo> {
        vec![
            ModelInfo {
                id: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo".to_string(),
                context_window: 128000,
                input_cost_per_1k: 0.005,
                output_cost_per_1k: 0.005,
            },
        ]
    }
}
