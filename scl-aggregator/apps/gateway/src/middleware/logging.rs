use axum::{
    body::{Body, Bytes},
    http::{Request, Response},
    middleware::Next,
};
use http_body_util::BodyExt;
use std::time::Instant;
use tracing::info;

pub async fn logging_middleware(
    req: Request<Body>,
    next: Next,
) -> Result<Response<Body>, axum::http::StatusCode> {
    let start = Instant::now();
    let path = req.uri().path().to_owned();
    let method = req.method().clone();

    // Extract model from request body if possible
    let (parts, body) = req.into_parts();
    
    let bytes = match body.collect().await {
        Ok(collected) => collected.to_bytes(),
        Err(_) => return Err(axum::http::StatusCode::BAD_REQUEST),
    };

    let mut model_name = String::from("unknown");
    if let Ok(json) = serde_json::from_slice::<serde_json::Value>(&bytes) {
        if let Some(m) = json.get("model").and_then(|v| v.as_str()) {
            model_name = m.to_string();
        }
    }

    // Reconstruct request
    let req = Request::from_parts(parts, Body::from(bytes));

    let res = next.run(req).await;
    let latency = start.elapsed();
    let status = res.status();

    // Note: We don't intercept the response body here to count tokens because 
    // it could be a streaming response and buffering it would break streaming.
    // For now, token counts are marked as "streaming_or_unparsed".
    let token_count = "streaming_or_unparsed";
    let provider = "router"; // We forward to our router service

    info!(
        method = %method,
        path = %path,
        status = %status.as_u16(),
        latency_ms = latency.as_millis(),
        model = %model_name,
        provider = %provider,
        tokens = %token_count,
        "Request processed"
    );

    Ok(res)
}
