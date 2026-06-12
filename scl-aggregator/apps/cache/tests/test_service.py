import pytest
from httpx import AsyncClient, ASGITransport
import os
import shutil
from cache_app.main import app

# Ensure a clean DB path for test service
TEST_DB_PATH = "./.test_chroma_service"

@pytest.fixture(autouse=True, scope="module")
def setup_teardown():
    # Setup
    os.environ["CHROMA_PATH"] = TEST_DB_PATH
    if os.path.exists(TEST_DB_PATH):
        shutil.rmtree(TEST_DB_PATH)
    
    yield
    
    # Teardown
    if os.path.exists(TEST_DB_PATH):
        shutil.rmtree(TEST_DB_PATH)

@pytest.mark.asyncio
async def test_health():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "semantic-cache"}

@pytest.mark.asyncio
async def test_cache_miss():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/check", json={"messages": [{"role": "user", "content": "What is rust?"}]})
    assert response.status_code == 200
    assert response.json() == {"hit": False}

@pytest.mark.asyncio
async def test_cache_set_and_get():
    transport = ASGITransport(app=app)
    msg = [{"role": "user", "content": "Tell me about memory safety."}]
    
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        # Set
        res_set = await ac.post("/cache/set", json={
            "messages": msg,
            "response": "Memory safety is a property...",
            "metadata": {"model": "gpt-4"}
        })
        assert res_set.status_code == 200
        
        # Get (exact)
        res_get = await ac.post("/cache/get", json={"messages": msg})
        assert res_get.status_code == 200
        data = res_get.json()
        assert data["hit"] is True
        assert data["response"] == "Memory safety is a property..."
        
@pytest.mark.asyncio
async def test_cache_stats():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.get("/cache/stats")
    assert res.status_code == 200
    data = res.json()
    assert "hit_rate" in data
    assert data["total_entries"] > 0
