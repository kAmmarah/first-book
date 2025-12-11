# Qdrant Collection Schema

This document describes the Qdrant collection schema for the AI Interactive Book platform's RAG chatbot.

## Collection Name
`book_chapters`

## Vector Parameters
- **Size**: 1536 (OpenAI's text-embedding-ada-002 dimensions)
- **Distance**: Cosine

## Payload Structure
Each point in the collection contains the following payload:

```json
{
  "chapter_id": "string",
  "text": "string",
  "section_title": "string (optional)",
  "chapter_title": "string (optional)"
}
```

## Point Structure
Each point in the collection has the following structure:

```json
{
  "id": "string or integer",
  "vector": "array of 1536 floats",
  "payload": {
    "chapter_id": "string",
    "text": "string",
    "section_title": "string (optional)",
    "chapter_title": "string (optional)"
  }
}
```

## Indexing
The collection uses the following indexes for efficient querying:

1. **Vector Index**: HNSW (Hierarchical Navigable Small World) for similarity search
2. **Payload Indexes**:
   - `chapter_id` - Keyword index for filtering by chapter
   - `section_title` - Keyword index for filtering by section
   - `chapter_title` - Keyword index for filtering by chapter title

## Collection Configuration
```json
{
  "name": "book_chapters",
  "vectors": {
    "size": 1536,
    "distance": "Cosine"
  },
  "hnsw_config": {
    "m": 16,
    "ef_construct": 100
  }
}
```

## Chunking Strategy
Book content is chunked using the following strategy:

1. **Chunk Size**: 1000 tokens
2. **Overlap**: 200 tokens
3. **Separator**: Sentence boundaries when possible

This ensures that chunks are semantically coherent while maintaining context overlap.

## Storage Recommendations
For the Qdrant Cloud free tier:
- Monitor storage usage to stay within the 1GB limit
- Consider archiving older content if approaching limits
- Use compression for payloads when possible

## API Usage Examples

### Creating the Collection
```python
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

client = QdrantClient(url="https://your-qdrant-cloud-url.qdrant.tech", api_key="your-api-key")

client.create_collection(
    collection_name="book_chapters",
    vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
)
```

### Storing Chapter Embeddings
```python
from qdrant_client.models import PointStruct

points = [
    PointStruct(
        id="chapter1_section1",
        vector=openai_embedding_vector,
        payload={
            "chapter_id": "chapter1",
            "text": "Chapter content here...",
            "section_title": "Introduction",
            "chapter_title": "Fundamentals of AI in Education"
        }
    )
]

client.upsert(
    collection_name="book_chapters",
    points=points
)
```

### Searching for Similar Content
```python
search_result = client.search(
    collection_name="book_chapters",
    query_vector=user_query_embedding,
    limit=5
)
```

### Filtering by Chapter
```python
from qdrant_client.models import Filter, FieldCondition, MatchValue

search_result = client.search(
    collection_name="book_chapters",
    query_vector=user_query_embedding,
    query_filter=Filter(
        must=[
            FieldCondition(
                key="chapter_id",
                match=MatchValue(value="chapter1")
            )
        ]
    ),
    limit=5
)
```

## Performance Considerations

1. **Vector Dimension**: Using 1536 dimensions (OpenAI's ada-002) provides a good balance between accuracy and performance
2. **HNSW Parameters**: 
   - `m=16`: Number of connections per node
   - `ef_construct=100`: Size of the dynamic candidate list during construction
3. **Search Efficiency**: ef parameter during search should be tuned based on accuracy/performance requirements

## Monitoring and Maintenance

Regular monitoring should include:
- Storage usage
- Query performance metrics
- Index fragmentation (if applicable)
- API call quotas for Qdrant Cloud free tier

## Security Considerations

1. API keys should be stored securely and not committed to version control
2. Use HTTPS connections to Qdrant Cloud
3. Restrict API key permissions to only necessary operations
4. Rotate API keys periodically