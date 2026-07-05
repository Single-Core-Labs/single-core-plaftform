use std::env;

#[derive(Debug, Clone)]
pub struct Config {
    pub port: u16,
    pub router_url: String,
    pub log_level: String,
    // Note: Valid API keys for basic auth. In-memory HashMap implemented in the auth middleware.
    pub valid_api_keys: Vec<String>,
}

impl Config {
    pub fn load() -> Self {
        // Load from .env file if present
        let _ = dotenvy::dotenv();

        let port = env::var("PORT")
            .unwrap_or_else(|_| "8000".to_string())
            .parse()
            .expect("PORT must be a number");

        let router_url = env::var("ROUTER_URL")
            .unwrap_or_else(|_| "http://localhost:8001".to_string());

        let log_level = env::var("LOG_LEVEL")
            .unwrap_or_else(|_| "info".to_string());

        let keys_env = env::var("VALID_API_KEYS").unwrap_or_else(|_| "sk-test-123".to_string());
        let valid_api_keys = keys_env.split(',').map(|s| s.trim().to_string()).collect();

        Self {
            port,
            router_url,
            log_level,
            valid_api_keys,
        }
    }
}
