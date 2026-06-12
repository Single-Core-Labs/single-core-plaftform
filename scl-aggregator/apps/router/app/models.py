from pydantic import BaseModel
from typing import List, Optional, Dict, Any, Union

class Message(BaseModel):
    role: str
    content: Union[str, List[Dict[str, Any]]]

class UnifiedRequest(BaseModel):
    model: Optional[str] = None
    messages: List[Message]
    temperature: Optional[float] = None
    max_tokens: Optional[int] = None
    stream: Optional[bool] = False
    routing_policy: Optional[str] = None

class RouteResponse(BaseModel):
    provider: Optional[str] = None
    model: Optional[str] = None
    reason: str
    estimated_cost: Optional[float] = None
    cached: bool
    cached_response: Optional[Any] = None

class ModelInfo(BaseModel):
    id: str
    provider: str
    input_cost_per_1k: float
    output_cost_per_1k: float
    latency_profile: str  # e.g. "fast", "medium", "slow"
