import json
import uuid
import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer
from typing import List, Dict, Any, Optional
from .types import CacheResult, CacheStats

class SemanticCache:
    def __init__(self, chroma_path: str = "./.chroma_cache", similarity_threshold: float = 0.92):
        self.chroma_path = chroma_path
        self.similarity_threshold = similarity_threshold
        
        # Load embedding model
        # Using a fast, lightweight model suitable for semantic search
        self.encoder = SentenceTransformer("all-MiniLM-L6-v2")
        
        # Init ChromaDB
        self.chroma_client = chromadb.PersistentClient(path=self.chroma_path)
        # Using L2 distance by default. 
        self.collection = self.chroma_client.get_or_create_collection(
            name="semantic_cache",
            metadata={"hnsw:space": "cosine"} # Use cosine distance for better thresholding
        )
        
        # In-memory stats (could be persisted to DB in production)
        self.hits = 0
        self.misses = 0
        self.total_similarity_on_hits = 0.0

    def _stringify_messages(self, messages: List[Dict[str, Any]]) -> str:
        """Converts the message payload into a flat string for embedding."""
        text_parts = []
        for msg in messages:
            role = msg.get("role", "")
            content = msg.get("content", "")
            if isinstance(content, str):
                text_parts.append(f"{role}: {content}")
            elif isinstance(content, list):
                # Handle multimodal or complex content arrays
                for part in content:
                    if isinstance(part, dict) and part.get("type") == "text":
                        text_parts.append(f"{role}: {part.get('text', '')}")
        
        return "\n".join(text_parts)

    async def get(self, messages: List[Dict[str, Any]]) -> Optional[CacheResult]:
        prompt_text = self._stringify_messages(messages)
        if not prompt_text.strip():
            return None

        # Embed the prompt
        query_embedding = self.encoder.encode(prompt_text).tolist()
        
        # Query ChromaDB
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=1,
            include=["documents", "metadatas", "distances"]
        )
        
        if not results["distances"] or not results["distances"][0]:
            self.misses += 1
            return None
            
        distance = results["distances"][0][0]
        # For cosine distance in Chroma, distance is 1 - cosine_similarity
        # Wait, actually Chroma's cosine is exactly 1 - cosine_similarity.
        similarity = 1.0 - distance
        
        if similarity >= self.similarity_threshold:
            self.hits += 1
            self.total_similarity_on_hits += similarity
            
            # Extract response and metadata
            response_doc = results["documents"][0][0]
            metadata = results["metadatas"][0][0]
            
            return CacheResult(
                response=json.loads(response_doc),
                similarity=similarity,
                hit=True,
                metadata=metadata
            )
            
        self.misses += 1
        return None

    async def set(self, messages: List[Dict[str, Any]], response: Any, metadata: Dict[str, Any] = None):
        prompt_text = self._stringify_messages(messages)
        if not prompt_text.strip():
            return
            
        embedding = self.encoder.encode(prompt_text).tolist()
        doc_id = str(uuid.uuid4())
        
        # Store response as JSON string
        response_str = json.dumps(response)
        meta = metadata or {}
        
        self.collection.add(
            ids=[doc_id],
            embeddings=[embedding],
            documents=[response_str],
            metadatas=[meta]
        )

    async def invalidate(self, cache_id: str):
        """Invalidates an entry by its specific Chroma UUID."""
        self.collection.delete(ids=[cache_id])

    def stats(self) -> CacheStats:
        total = self.hits + self.misses
        hit_rate = (self.hits / total) if total > 0 else 0.0
        avg_sim = (self.total_similarity_on_hits / self.hits) if self.hits > 0 else 0.0
        
        return CacheStats(
            hit_rate=hit_rate,
            total_entries=self.collection.count(),
            avg_similarity=avg_sim,
            hits=self.hits,
            misses=self.misses
        )
