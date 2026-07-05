from typing import List, Tuple
import re
from app.models import Message, ModelInfo

# Database of available models
AVAILABLE_MODELS = [
    ModelInfo(id="claude-3-5-sonnet-20240620", provider="anthropic", input_cost_per_1k=0.003, output_cost_per_1k=0.015, latency_profile="medium"),
    ModelInfo(id="claude-3-opus-20240229", provider="anthropic", input_cost_per_1k=0.015, output_cost_per_1k=0.075, latency_profile="slow"),
    ModelInfo(id="claude-3-haiku-20240307", provider="anthropic", input_cost_per_1k=0.00025, output_cost_per_1k=0.00125, latency_profile="fast"),
    ModelInfo(id="gpt-4o", provider="openai", input_cost_per_1k=0.005, output_cost_per_1k=0.015, latency_profile="medium"),
    ModelInfo(id="gpt-4o-mini", provider="openai", input_cost_per_1k=0.00015, output_cost_per_1k=0.0006, latency_profile="fast"),
    ModelInfo(id="o3", provider="openai", input_cost_per_1k=0.005, output_cost_per_1k=0.015, latency_profile="slow"),
    ModelInfo(id="gemini-2.5-pro", provider="google", input_cost_per_1k=0.00125, output_cost_per_1k=0.005, latency_profile="medium"),
    ModelInfo(id="llama-3.3-70b-versatile", provider="groq", input_cost_per_1k=0.00059, output_cost_per_1k=0.00079, latency_profile="fastest"),
]

def detect_intent(messages: List[Message]) -> str:
    combined_text = ""
    for msg in messages:
        if isinstance(msg.content, str):
            combined_text += msg.content.lower() + " "
        elif isinstance(msg.content, list):
            for part in msg.content:
                if isinstance(part, dict):
                    if part.get("type") in ["image_url", "image"] or "image" in part or "base64" in part.values():
                        return "vision"
                    if part.get("type") == "text":
                        combined_text += str(part.get("text", "")).lower() + " "

    if re.search(r'\b(code|function|python|rust|javascript|bug|error)\b', combined_text):
        return "code"
    if re.search(r'\b(solve|math|equation|reason|logic|puzzle|prove)\b', combined_text):
        return "reasoning"
    if re.search(r'\b(chat|quick|summarize|fast|hello|hi)\b', combined_text):
        return "fast"
    if re.search(r'\b(image|base64|picture)\b', combined_text):
        return "vision"

    return "default"

def select_model(intent: str, policy: str) -> Tuple[ModelInfo, str]:
    candidates = []
    reason = f"Intent classified as '{intent}'."

    if intent == "code":
        candidates = ["claude-3-5-sonnet-20240620", "gpt-4o"]
    elif intent == "reasoning":
        candidates = ["claude-3-opus-20240229", "o3"]
    elif intent == "fast":
        candidates = ["llama-3.3-70b-versatile", "claude-3-haiku-20240307"]
    elif intent == "vision":
        candidates = ["gpt-4o", "gemini-2.5-pro"]
    else:
        candidates = ["claude-3-5-sonnet-20240620"]

    candidate_models = [m for m in AVAILABLE_MODELS if m.id in candidates]

    if policy == "cost_first":
        selected = min(candidate_models, key=lambda m: m.input_cost_per_1k)
        reason += " Selected cheapest via cost_first policy."
    elif policy == "latency_first":
        # Hacky priority for latency
        latency_scores = {"fastest": 1, "fast": 2, "medium": 3, "slow": 4}
        selected = min(candidate_models, key=lambda m: latency_scores.get(m.latency_profile, 5))
        reason += " Selected fastest via latency_first policy."
    elif policy == "quality_first":
        # Proxy quality by cost (more expensive = better)
        selected = max(candidate_models, key=lambda m: m.input_cost_per_1k)
        reason += " Selected highest quality via quality_first policy."
    else:
        # Default: just take the first candidate
        selected = candidate_models[0]
        reason += " Default policy."

    return selected, reason
