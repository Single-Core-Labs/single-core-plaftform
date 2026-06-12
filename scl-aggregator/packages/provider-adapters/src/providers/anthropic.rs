use std::env;

use async_trait::async_trait;
use futures::{StreamExt, stream::BoxStream};
use reqwest::{Client, header};
use serde::{Deserialize, Serialize};

use crate::traits::{ChunkStream, ProviderAdapter};
use crate::types::{ModelInfo, ProviderError, UnifiedChunk, UnifiedRequest, UnifiedResponse, Usage};

#[derive(Serialize)]
struct AnthropicRequest {
    model: String,
    messages: Vec<AnthropicMessage>,
    max_tokens: u32,
    #[serde(skip_serializing_if = "Option::is_none")]
    temperature: Option<f32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    stream: Option<bool>,
}

#[derive(Serialize)]
struct AnthropicMessage {
    role: String,
    content: String,
}

#[derive(Deserialize)]
struct AnthropicResponse {
    content: Vec<AnthropicContentBlock>,
    usage: Option<AnthropicUsage>,
}

#[derive(Deserialize)]
struct AnthropicContentBlock {
    text: Option<String>,
}

#[derive(Deserialize)]
struct AnthropicUsage {
    input_tokens: u32,
    output_tokens: u32,
}

// For streaming
#[derive(Deserialize)]
#[serde(tag = "type")]
enum AnthropicStreamEvent {
    #[serde(rename = "content_block_delta")]
    ContentBlockDelta { delta: AnthropicDelta },
    #[serde(other)]
    Other,
}

#[derive(Deserialize)]
struct AnthropicDelta {
    #[serde(rename = "type")]
    delta_type: String,
    text: Option<String>,
}

pub struct AnthropicAdapter {
    client: Client,
    api_key: String,
    base_url: String,
}

impl AnthropicAdapter {
    pub fn new() -> Result<Self, ProviderError> {
        let api_key = env::var("ANTHROPIC_API_KEY")
            .map_err(|_| ProviderError::ApiKeyMissing("ANTHROPIC_API_KEY".to_string()))?;
        
        let base_url = env::var("ANTHROPIC_BASE_URL")
            .unwrap_or_else(|_| "https://api.anthropic.com/v1".to_string());

        let mut headers = header::HeaderMap::new();
        let mut auth_header = header::HeaderValue::from_str(&api_key)
            .map_err(|_| ProviderError::ApiError("Invalid API key format".to_string()))?;
        auth_header.set_sensitive(true);
        headers.insert("x-api-key", auth_header);
        headers.insert("anthropic-version", header::HeaderValue::from_static("2023-06-01"));

        let client = Client::builder()
            .default_headers(headers)
            .build()
            .map_err(ProviderError::RequestFailed)?;

        Ok(Self { client, api_key, base_url })
    }

    fn to_anthropic_req(req: &UnifiedRequest) -> AnthropicRequest {
        AnthropicRequest {
            model: req.model.clone(),
            messages: req.messages.iter().map(|m| AnthropicMessage {
                role: m.role.clone(),
                content: m.content.clone(),
            }).collect(),
            max_tokens: req.max_tokens.unwrap_or(1024), // Anthropic requires max_tokens
            temperature: req.temperature,
            stream: req.stream,
        }
    }
}

#[async_trait]
impl ProviderAdapter for AnthropicAdapter {
    async fn complete(&self, request: &UnifiedRequest) -> Result<UnifiedResponse, ProviderError> {
        let url = format!("{}/messages", self.base_url);
        let anthropic_req = Self::to_anthropic_req(request);

        let resp = self.client.post(&url)
            .json(&anthropic_req)
            .send()
            .await?;

        if !resp.status().is_success() {
            let err_text = resp.text().await.unwrap_or_default();
            return Err(ProviderError::ApiError(format!("Anthropic API error: {}", err_text)));
        }

        let anthropic_res: AnthropicResponse = resp.json().await?;

        let content = anthropic_res.content.first()
            .and_then(|c| c.text.clone())
            .unwrap_or_default();

        let usage = anthropic_res.usage.map(|u| Usage {
            prompt_tokens: u.input_tokens,
            completion_tokens: u.output_tokens,
        }).unwrap_or_default();

        Ok(UnifiedResponse {
            content,
            model: request.model.clone(),
            usage,
        })
    }

    async fn stream(&self, request: &UnifiedRequest) -> Result<ChunkStream, ProviderError> {
        let url = format!("{}/messages", self.base_url);
        let mut anthropic_req = Self::to_anthropic_req(request);
        anthropic_req.stream = Some(true);

        let resp = self.client.post(&url)
            .json(&anthropic_req)
            .send()
            .await?;

        if !resp.status().is_success() {
            let err_text = resp.text().await.unwrap_or_default();
            return Err(ProviderError::ApiError(format!("Anthropic API error: {}", err_text)));
        }

        let stream = resp.bytes_stream().map(|chunk_res| {
            let chunk = chunk_res.map_err(ProviderError::RequestFailed)?;
            let text = String::from_utf8_lossy(&chunk);
            
            let mut content_delta = String::new();
            for line in text.lines() {
                if line.starts_with("data: ") {
                    let data = &line[6..];
                    if let Ok(event) = serde_json::from_str::<AnthropicStreamEvent>(data) {
                        if let AnthropicStreamEvent::ContentBlockDelta { delta } = event {
                            if delta.delta_type == "text_delta" {
                                if let Some(t) = delta.text {
                                    content_delta.push_str(&t);
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
        "anthropic"
    }

    fn models(&self) -> Vec<ModelInfo> {
        vec![
            ModelInfo {
                id: "claude-3-opus-20240229".to_string(),
                context_window: 200000,
                input_cost_per_1k: 0.015,
                output_cost_per_1k: 0.075,
            },
            ModelInfo {
                id: "claude-3-5-sonnet-20240620".to_string(),
                context_window: 200000,
                input_cost_per_1k: 0.003,
                output_cost_per_1k: 0.015,
            },
            ModelInfo {
                id: "claude-3-haiku-20240307".to_string(),
                context_window: 200000,
                input_cost_per_1k: 0.00025,
                output_cost_per_1k: 0.00125,
            },
        ]
    }
}
