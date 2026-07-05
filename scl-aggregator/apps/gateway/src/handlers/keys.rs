use axum::{
    extract::{State, Path, Query},
    response::IntoResponse,
    http::{Method, HeaderMap},
    Json,
};
use std::sync::Arc;
use serde::Deserialize;
use crate::proxy::ProxyClient;

#[derive(Deserialize)]
pub struct KeyQuery {
    pub user_id: String,
}

pub async fn list_keys(
    State(proxy): State<Arc<ProxyClient>>,
    Query(query): Query<KeyQuery>,
) -> impl IntoResponse {
    let path = format!("/keys?userId={}", query.user_id);
    match proxy.forward_request(&path, Method::GET, HeaderMap::new(), axum::body::Body::empty()).await {
        Ok(res) => res,
        Err(status) => status.into_response(),
    }
}

pub async fn create_key(
    State(proxy): State<Arc<ProxyClient>>,
    req: axum::extract::Request,
) -> impl IntoResponse {
    let (parts, body) = req.into_parts();
    match proxy.forward_request("/keys", Method::POST, parts.headers, body).await {
        Ok(res) => res,
        Err(status) => status.into_response(),
    }
}

pub async fn revoke_key(
    State(proxy): State<Arc<ProxyClient>>,
    Path(id): Path<String>,
) -> impl IntoResponse {
    let path = format!("/keys/{}", id);
    match proxy.forward_request(&path, Method::DELETE, HeaderMap::new(), axum::body::Body::empty()).await {
        Ok(res) => res,
        Err(status) => status.into_response(),
    }
}
