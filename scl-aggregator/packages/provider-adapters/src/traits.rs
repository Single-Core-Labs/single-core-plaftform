use std::pin::Pin;

use async_trait::async_trait;
use futures::Stream;

use crate::types::{ModelInfo, ProviderError, UnifiedChunk, UnifiedRequest, UnifiedResponse};

pub type ChunkStream = Pin<Box<dyn Stream<Item = Result<UnifiedChunk, ProviderError>> + Send>>;

#[async_trait]
pub trait ProviderAdapter: Send + Sync {
    async fn complete(&self, request: &UnifiedRequest) -> Result<UnifiedResponse, ProviderError>;

    async fn stream(&self, request: &UnifiedRequest) -> Result<ChunkStream, ProviderError>;

    fn name(&self) -> &'static str;

    fn models(&self) -> Vec<ModelInfo>;
}
