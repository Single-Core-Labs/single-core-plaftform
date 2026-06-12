use std::env;
use mockito::Server;

use crate::providers::openai::OpenAiAdapter;
use crate::traits::ProviderAdapter;
use crate::types::{Message, UnifiedRequest};

#[tokio::test]
async fn test_openai_adapter_complete() {
    let mut server = Server::new_async().await;
    
    let mock_response = r#"{
        "id": "chatcmpl-123",
        "object": "chat.completion",
        "created": 1677652288,
        "model": "gpt-4o",
        "system_fingerprint": "fp_44709d6fcb",
        "choices": [{
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "Hello there!"
            },
            "finish_reason": "stop"
        }],
        "usage": {
            "prompt_tokens": 9,
            "completion_tokens": 12,
            "total_tokens": 21
        }
    }"#;

    let mock = server.mock("POST", "/chat/completions")
        .with_status(200)
        .with_header("content-type", "application/json")
        .with_body(mock_response)
        .create_async().await;

    // Set environment variables for the test
    env::set_var("OPENAI_API_KEY", "test_key");
    env::set_var("OPENAI_BASE_URL", server.url());

    let adapter = OpenAiAdapter::new().expect("Failed to initialize OpenAiAdapter");

    let request = UnifiedRequest {
        model: "gpt-4o".to_string(),
        messages: vec![Message {
            role: "user".to_string(),
            content: "Hi".to_string(),
        }],
        temperature: Some(0.7),
        max_tokens: Some(100),
        stream: Some(false),
    };

    let result = adapter.complete(&request).await.expect("Complete failed");
    
    assert_eq!(result.content, "Hello there!");
    assert_eq!(result.usage.prompt_tokens, 9);
    assert_eq!(result.usage.completion_tokens, 12);
    assert_eq!(result.model, "gpt-4o");

    mock.assert_async().await;
}
