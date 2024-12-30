from typing import AsyncGenerator

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from config import settings


async def get_database() -> AsyncGenerator[AsyncIOMotorDatabase, None]:
    mongo_client = AsyncIOMotorClient(settings.mongo_dsn)
    try:
        yield mongo_client[settings.MONGO_BASE]
    finally:
        mongo_client.close()
