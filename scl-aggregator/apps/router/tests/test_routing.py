import pytest
from httpx import AsyncClient, ASGITransport
import respx
from app.main import app

@pytest.mark.asyncio
async def test_health_check():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "router"}

@pytest.mark.asyncio
async def test_route_code_cost_first():
    request_data = {
        "messages": [{"role": "user", "content": "write a python function"}],
        "routing_policy": "cost_first"
    }
    
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/route", json=request_data)
        
    assert response.status_code == 200
    data = response.json()
    assert data["cached"] is False
    assert data["provider"] == "anthropic"
    assert data["model"] == "claude-3-5-sonnet-20240620"  # sonnet is cheaper than gpt-4o in our DB

@pytest.mark.asyncio
async def test_route_math_quality_first():
    request_data = {
        "messages": [{"role": "user", "content": "solve this math puzzle"}],
        "routing_policy": "quality_first"
    }
    
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/route", json=request_data)
        
    assert response.status_code == 200
    data = response.json()
    assert data["cached"] is False
    # Opus vs o3, let's check who is "highest quality" via proxy of input cost. Opus = 0.015, o3 = 0.005. So Opus wins.
    assert data["model"] == "claude-3-opus-20240229"

@pytest.mark.asyncio
async def test_route_fast_latency_first():
    request_data = {
        "messages": [{"role": "user", "content": "hello quick question"}],
        "routing_policy": "latency_first"
    }
    
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/route", json=request_data)
        
    assert response.status_code == 200
    data = response.json()
    assert data["cached"] is False
    assert data["provider"] == "groq"
    assert data["model"] == "llama-3.3-70b-versatile"

@pytest.mark.asyncio
@respx.mock
async def test_route_cache_hit():
    # Mock the cache service
    respx.post("http://localhost:8002/check").respond(
        status_code=200, 
        json={"hit": True, "similarity": 0.95, "response": "Cached answer"}
    )
    
    request_data = {
        "messages": [{"role": "user", "content": "what is 2+2?"}]
    }
    
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/route", json=request_data)
        
    assert response.status_code == 200
    data = response.json()
    assert data["cached"] is True
    assert data["cached_response"] == "Cached answer"
