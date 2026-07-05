use anyhow::{anyhow, Context, Result};
use clap::Args;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::time::Duration;

#[derive(Args)]
pub struct InspectArgs {
    pub prompt: String,
    #[arg(short, long)]
    pub policy: Option<String>,
}

#[derive(Serialize)]
struct InspectRequest {
    prompt: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    policy: Option<String>,
}

#[derive(Deserialize, Debug)]
struct InspectResponse {
    #[serde(rename = "promptAnalysis")]
    prompt_analysis: PromptAnalysis,
    #[serde(rename = "routingDecision")]
    routing_decision: RoutingDecision,
    #[serde(rename = "alternativesConsidered")]
    alternatives_considered: Vec<Alternative>,
    #[serde(rename = "cacheCheck")]
    cache_check: CacheCheck,
    #[serde(rename = "costEstimate")]
    cost_estimate: CostEstimate,
}

#[derive(Deserialize, Debug)]
struct PromptAnalysis {
    length: String,
    intent: String,
    language: String,
    complexity: String,
    #[serde(rename = "confidence")]
    intent_confidence: f32,
}

#[derive(Deserialize, Debug)]
struct RoutingDecision {
    policy: String,
    selected: String,
    reason: String,
    provider: String, // Assuming provider is also part of routing decision
}

#[derive(Deserialize, Debug)]
struct Alternative {
    model: String,
    score: f32,
    #[serde(rename = "policyPick")]
    policy_pick: Option<String>,
}

#[derive(Deserialize, Debug)]
struct CacheCheck {
    status: String,
    nearest: String,
    threshold: f32,
    #[serde(rename = "nearestPrompt")]
    nearest_prompt: Option<String>,
    #[serde(rename = "timeAgo")]
    time_ago: Option<String>,
}

#[derive(Deserialize, Debug)]
struct CostEstimate {
    input: String,
    output: String,
    total: String,
    #[serde(rename = "ifCached")]
    if_cached: String,
}


pub async fn inspect_command(
    config: &crate::Config,
    args: InspectArgs,
) -> Result<()> {
    let gateway_url = &config.gateway_url;

    let client = Client::new();

    let request_body = InspectRequest {
        prompt: args.prompt,
        policy: args.policy,
    };

    let response = client
        .post(format!("{}/route/inspect", gateway_url))
        .json(&request_body)
        .timeout(Duration::from_secs(10)) // Add a request timeout
        .send()
        .await
        .context("Failed to send request to router inspect endpoint")?;

    let status = response.status();
    if !status.is_success() {
        let error_body = response.text().await.unwrap_or_else(|_| "N/A".to_string());
        return Err(anyhow!("Router inspect failed with status {}: {}", status, error_body));
    }

    let inspect_response: InspectResponse = response.json().await.context("Failed to parse router inspect response")?;

    // Now, render the output using `inspect_response`
    println!("╭─ scl route inspect ───────────────────────────────────────╮");

    // Prompt analysis
    println!("\n  Prompt analysis");
    println!("  ───────────────");
    println!("  length      {}", inspect_response.prompt_analysis.length);
    println!("  intent      {}  (confidence {:.2})", inspect_response.prompt_analysis.intent, inspect_response.prompt_analysis.intent_confidence);
    println!("  language    {}", inspect_response.prompt_analysis.language);
    println!("  complexity  {}", inspect_response.prompt_analysis.complexity);

    // Routing decision
    println!("\n  Routing decision");
    println!("  ────────────────");
    println!("  policy        {}", inspect_response.routing_decision.policy);
    println!("  selected      {}  ({})", inspect_response.routing_decision.selected, inspect_response.routing_decision.provider);
    println!("  reason        {}", inspect_response.routing_decision.reason);

    // Alternatives considered
    println!("\n  Alternatives considered");
    println!("  ───────────────────────");
    for (i, alt) in inspect_response.alternatives_considered.iter().enumerate() {
        let suffix = if i == 0 { "  ← selected" } else { "" };
        let policy_pick = if let Some(pp) = &alt.policy_pick {
            format!(" ({})", pp)
        } else {
            "".to_string()
        };
        println!("  {}. {:<20} score {:.2}{}{}", i + 1, alt.model, alt.score, policy_pick, suffix);
    }

    // Cache check
    println!("\n  Cache check");
    println!("  ───────────");
    println!("  status      {}", inspect_response.cache_check.status);
    println!("  nearest     similarity {:.2}  (threshold {:.2})", inspect_response.cache_check.nearest, inspect_response.cache_check.threshold);
    if let Some(nearest_prompt) = &inspect_response.cache_check.nearest_prompt {
        println!("  nearest prompt  \"{}\"  [{}]", nearest_prompt, inspect_response.cache_check.time_ago.as_deref().unwrap_or("unknown time"));
    }

    // Cost estimate
    println!("\n  Cost estimate");
    println!("  ─────────────");
    println!("  input       {}", inspect_response.cost_estimate.input);
    println!("  output      {}", inspect_response.cost_estimate.output);
    println!("  total       {}", inspect_response.cost_estimate.total);
    println!("  if cached   {}", inspect_response.cost_estimate.if_cached);

    println!("\n╰───────────────────────────────────────────────────────────╯");

    Ok(())
}
