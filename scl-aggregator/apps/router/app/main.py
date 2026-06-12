from fastapi import FastAPI, HTTPException
from typing import List
from app.models import UnifiedRequest, RouteResponse, ModelInfo
from app.routing import detect_intent, select_model, AVAILABLE_MODELS
from app.cache import check_semantic_cache

app = FastAPI(title="Router Service")

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "router"}

@app.get("/models", response_model=List[ModelInfo])
def get_models():
    return AVAILABLE_MODELS

@app.post("/route", response_model=RouteResponse)
async def route_request(request: UnifiedRequest):
    # 1. Check Semantic Cache
    is_cached, cached_data = await check_semantic_cache(request.messages)
    if is_cached:
        return RouteResponse(
            reason="Semantic cache hit.",
            cached=True,
            cached_response=cached_data
        )

    # 2. Detect Intent
    intent = detect_intent(request.messages)

    # 3. Select Model
    policy = request.routing_policy or "default"
    selected_model, reason = select_model(intent, policy)

    return RouteResponse(
        provider=selected_model.provider,
        model=selected_model.id,
        reason=reason,
        estimated_cost=selected_model.input_cost_per_1k, # Rough estimate for input cost
        cached=False
    )
