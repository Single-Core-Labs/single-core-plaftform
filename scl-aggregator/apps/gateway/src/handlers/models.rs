use axum::{
    extract::State,
    response::IntoResponse,
    http::{Method, HeaderMap},
};
use std::sync::Arc;
use crate::proxy::ProxyClient;

pub async fn list_models(
    State(proxy): State<Arc<ProxyClient>>,
) -> impl IntoResponse {
    // Models is a GET request, no body needed
    match proxy.forward_request("/models", Method::GET, HeaderMap::new(), axum::body::Body::empty()).await {
        Ok(res) => res,
        Err(status) => status.into_response(),
    }
}
