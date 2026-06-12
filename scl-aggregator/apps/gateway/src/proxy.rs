use axum::{
    body::Body,
    extract::Request,
    http::{HeaderMap, HeaderValue, StatusCode},
    response::{IntoResponse, Response},
};
use reqwest::{Client, Method, Url};
use std::sync::Arc;

#[derive(Clone)]
pub struct ProxyClient {
    pub client: Client,
    pub router_url: String,
}

impl ProxyClient {
    pub fn new(router_url: String) -> Self {
        Self {
            client: Client::new(),
            router_url,
        }
    }

    pub async fn forward_request(
        &self,
        path: &str,
        method: Method,
        headers: HeaderMap,
        body: Body,
    ) -> Result<Response, StatusCode> {
        let url = format!("{}{}", self.router_url, path);
        let parsed_url = Url::parse(&url).map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

        // Read the body into bytes. We can stream it to reqwest if needed,
        // but since we read it into Bytes in the logging middleware, it's already buffered in memory.
        let body_bytes = axum::body::to_bytes(body, usize::MAX)
            .await
            .map_err(|_| StatusCode::BAD_REQUEST)?;

        let mut req_builder = self.client.request(method, parsed_url).body(body_bytes);

        // Forward some safe headers
        for (name, value) in headers.iter() {
            if name != reqwest::header::HOST && name != reqwest::header::CONNECTION {
                req_builder = req_builder.header(name, value);
            }
        }

        let resp = req_builder
            .send()
            .await
            .map_err(|_| StatusCode::BAD_GATEWAY)?;

        let status = resp.status();
        let mut response_headers = HeaderMap::new();

        for (name, value) in resp.headers().iter() {
            response_headers.insert(name.clone(), value.clone());
        }

        // Stream the response back
        let stream = resp.bytes_stream();
        let body = Body::from_stream(stream);

        let mut response = response_headers.into_response();
        *response.status_mut() = status;
        *response.body_mut() = body;

        Ok(response)
    }
}
