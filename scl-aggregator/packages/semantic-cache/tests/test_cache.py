import pytest
import os
import shutil
from semantic_cache import SemanticCache

@pytest.fixture(scope="module")
def cache():
    # Use a temporary directory for tests
    test_dir = "./.test_chroma"
    if os.path.exists(test_dir):
        shutil.rmtree(test_dir)
    
    c = SemanticCache(chroma_path=test_dir, similarity_threshold=0.90)
    yield c
    
    # Cleanup
    if os.path.exists(test_dir):
        shutil.rmtree(test_dir)

@pytest.mark.asyncio
async def test_cache_miss(cache):
    msg = [{"role": "user", "content": "What is the capital of France?"}]
    result = await cache.get(msg)
    assert result is None
    
@pytest.mark.asyncio
async def test_cache_set_and_hit(cache):
    msg = [{"role": "user", "content": "Explain quantum computing simply."}]
    response_data = {"text": "Quantum computing uses qubits..."}
    meta = {"model": "gpt-4o"}
    
    # Set the cache
    await cache.set(msg, response_data, meta)
    
    # Get exactly the same message
    result = await cache.get(msg)
    assert result is not None
    assert result.hit is True
    assert result.response == response_data
    assert result.metadata["model"] == "gpt-4o"
    assert result.similarity >= 0.99 # Should be almost 1.0 for exact match

@pytest.mark.asyncio
async def test_cache_semantic_hit(cache):
    # This assumes test_cache_set_and_hit ran and stored the quantum computing explanation
    # Let's ask a semantically similar question
    similar_msg = [{"role": "user", "content": "Can you explain quantum computers in simple terms?"}]
    
    result = await cache.get(similar_msg)
    assert result is not None
    assert result.hit is True
    assert result.similarity >= 0.90
    assert result.response["text"] == "Quantum computing uses qubits..."

@pytest.mark.asyncio
async def test_cache_stats(cache):
    stats = cache.stats()
    assert stats.total_entries > 0
    assert stats.hits > 0
    assert stats.misses > 0
    assert stats.hit_rate > 0.0
