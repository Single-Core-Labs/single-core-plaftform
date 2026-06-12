use axum::{
    body::Body,
    extract::{Request, State},
    response::IntoResponse,
};
use std::sync::Arc;
use crate::proxy::ProxyClient;

pub async fn messages(
    State(proxy): State<Arc<ProxyClient>>,
    req: Request<Body>,
) -> impl IntoResponse {
    let (parts, body) = req.into_parts();
    
    match proxy.forward_request("/v1/messages", parts.method, parts.headers, body).await {
        Ok(res) => res,
        Err(status) => status.into_response(),
    }
}
