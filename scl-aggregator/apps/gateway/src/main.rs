mod config;
mod handlers;
mod middleware;
mod proxy;

use axum::{
    middleware::from_fn_with_state,
    routing::{get, post},
    Router,
};
use std::sync::Arc;
use tower::ServiceBuilder;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

use crate::config::Config;
use crate::middleware::auth::{auth_middleware, AuthState};
use crate::middleware::logging::logging_middleware;
use crate::proxy::ProxyClient;

#[tokio::main]
async fn main() {
    // Load config
    let config = Config::load();

    // Setup tracing
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new(&config.log_level))
        .with(tracing_subscriber::fmt::layer())
        .init();

    tracing::info!("Starting Gateway on port {}", config.port);
    tracing::info!("Router URL: {}", config.router_url);

    // Initialize states
    let auth_state = AuthState::new(config.valid_api_keys.clone());
    let proxy_client = Arc::new(ProxyClient::new(config.router_url.clone()));

    // API Routes that require authentication
    let api_routes = Router::new()
        .route("/v1/chat/completions", post(handlers::chat::chat_completions))
        .route("/v1/messages", post(handlers::messages::messages))
        .route_layer(from_fn_with_state(auth_state, auth_middleware));

    // Combine routes and add global logging middleware
    let app = Router::new()
        .route("/health", get(handlers::health::health_check))
        .merge(api_routes)
        .with_state(proxy_client)
        .layer(
            ServiceBuilder::new()
                .layer(axum::middleware::from_fn(logging_middleware)),
        );

    // Start server
    let addr = format!("0.0.0.0:{}", config.port);
    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
