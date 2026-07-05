use axum::{
    body::Body,
    extract::{Request, State},
    response::IntoResponse,
};
use std::sync::Arc;
use crate::proxy::ProxyClient;

pub async fn chat_completions(
    State(proxy): State<Arc<ProxyClient>>,
    req: Request<Body>,
) -> impl IntoResponse {
    let (parts, body) = req.into_parts();
    
    match proxy.forward_request("/v1/chat/completions", parts.method, parts.headers, body).await {
        Ok(res) => res,
        Err(status) => status.into_response(),
    }
}
