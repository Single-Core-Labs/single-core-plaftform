from pydantic import BaseModel
from typing import Optional, Any, Dict

class CacheResult(BaseModel):
    response: Any
    similarity: float
    hit: bool
    metadata: Optional[Dict[str, Any]] = None

class CacheStats(BaseModel):
    hit_rate: float
    total_entries: int
    avg_similarity: float
    hits: int
    misses: int
