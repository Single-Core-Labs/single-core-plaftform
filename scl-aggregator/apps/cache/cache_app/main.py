from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import os

from semantic_cache import SemanticCache

app = FastAPI(title="Semantic Cache Service")

# Initialize global cache instance
cache = SemanticCache(
    chroma_path=os.getenv("CHROMA_PATH", "./.chroma_cache"),
    similarity_threshold=float(os.getenv("SIMILARITY_THRESHOLD", "0.92"))
)

class CheckRequest(BaseModel):
    messages: List[Dict[str, Any]]

class SetRequest(BaseModel):
    messages: List[Dict[str, Any]]
    response: Any
    metadata: Optional[Dict[str, Any]] = None

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "semantic-cache"}

@app.post("/check")
@app.post("/cache/get")
async def cache_get(req: CheckRequest):
    result = await cache.get(req.messages)
    if result:
        return {
            "hit": result.hit,
            "similarity": result.similarity,
            "response": result.response,
            "metadata": result.metadata
        }
    return {"hit": False}

@app.post("/cache/set")
async def cache_set(req: SetRequest):
    await cache.set(req.messages, req.response, req.metadata)
    return {"status": "stored"}

@app.delete("/cache/{cache_id}")
async def cache_invalidate(cache_id: str):
    await cache.invalidate(cache_id)
    return {"status": "invalidated", "id": cache_id}

@app.get("/cache/stats")
async def cache_stats():
    stats = cache.stats()
    return stats.model_dump()
