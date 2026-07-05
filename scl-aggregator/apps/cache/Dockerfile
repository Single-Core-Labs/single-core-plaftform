FROM python:3.11-slim

WORKDIR /app

# Install dependencies (requires building native extensions for some libraries)
RUN apt-get update && apt-get install -y build-essential curl && rm -rf /var/lib/apt/lists/*

# Assuming the repository structure allows copying both semantic-cache and cache app
# In a real monorepo build, we'd copy the workspace. Here we'll install directly.
COPY ./packages/semantic-cache /workspace/packages/semantic-cache
COPY ./apps/cache /workspace/apps/cache

WORKDIR /workspace/apps/cache

# Install the local semantic-cache package and service dependencies
RUN pip install --no-cache-dir -e /workspace/packages/semantic-cache
RUN pip install --no-cache-dir fastapi uvicorn pydantic

EXPOSE 8002

CMD ["uvicorn", "cache_app.main:app", "--host", "0.0.0.0", "--port", "8002"]
