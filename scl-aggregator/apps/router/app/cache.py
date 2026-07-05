import os
import httpx
from typing import List, Dict, Any, Tuple
from app.models import Message

CACHE_URL = os.getenv("CACHE_URL", "http://localhost:8002")

async def check_semantic_cache(messages: List[Message]) -> Tuple[bool, Any]:
    """
    Calls the Semantic Cache service to see if there is a hit for this request.
    Returns (True, response_data) if hit (> 0.92 similarity), otherwise (False, None).
    Gracefully degrades to False if the cache service is offline.
    """
    try:
        # Convert Pydantic messages to dict
        payload = {"messages": [m.model_dump() for m in messages]}
        
        async with httpx.AsyncClient(timeout=2.0) as client:
            response = await client.post(f"{CACHE_URL}/check", json=payload)
            response.raise_for_status()
            data = response.json()
            
            if data.get("hit") and data.get("similarity", 0) > 0.92:
                return True, data.get("response")
                
    except (httpx.RequestError, httpx.HTTPStatusError):
        # Graceful degradation if cache is unreachable or fails
        pass

    return False, None
