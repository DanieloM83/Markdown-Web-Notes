from typing import AsyncGenerator

from redis.asyncio import Redis

from config import settings


async def get_database() -> AsyncGenerator[Redis, None]:
    redis_client = Redis.from_url(settings.redis_dsn)
    try:
        yield redis_client
    finally:
        await redis_client.close()
