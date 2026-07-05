use axum::{
    extract::State,
    http::{Request, StatusCode},
    middleware::Next,
    response::Response,
};
use std::collections::HashMap;
use std::sync::Arc;

#[derive(Clone)]
pub struct AuthState {
    pub valid_keys: Arc<HashMap<String, bool>>,
}

impl AuthState {
    pub fn new(keys: Vec<String>) -> Self {
        let mut map = HashMap::new();
        for key in keys {
            map.insert(key, true);
        }
        Self {
            valid_keys: Arc::new(map),
        }
    }
}

pub async fn auth_middleware<B>(
    State(state): State<AuthState>,
    req: Request<B>,
    next: Next,
) -> Result<Response, StatusCode> {
    let auth_header = req.headers().get("authorization");

    let auth_header = match auth_header {
        Some(header) => header.to_str().map_err(|_| StatusCode::UNAUTHORIZED)?,
        None => return Err(StatusCode::UNAUTHORIZED),
    };

    if !auth_header.starts_with("Bearer ") {
        return Err(StatusCode::UNAUTHORIZED);
    }

    let token = auth_header[7..].trim();

    if state.valid_keys.contains_key(token) {
        Ok(next.run(req).await)
    } else {
        Err(StatusCode::UNAUTHORIZED)
    }
}
