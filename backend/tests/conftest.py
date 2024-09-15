import pytest
from fastapi.testclient import TestClient
from fakeredis import FakeAsyncRedis
from mongomock_motor import AsyncMongoMockClient

from src.main import app
from src.dependencies import get_redis, get_mongo_base


def get_redis_override():
    redis_client = FakeAsyncRedis()

    def wrapper():
        yield redis_client

    return wrapper


def get_mongo_override():
    mongo_client = AsyncMongoMockClient()

    def wrapper():
        yield mongo_client["test_base"]

    return wrapper


@pytest.fixture(scope="function", autouse=True)
def restore_bases():
    # Create new instances of mongo_client and redis_client. So databases will be restored.
    app.dependency_overrides[get_redis] = get_redis_override()
    app.dependency_overrides[get_mongo_base] = get_mongo_override()


@pytest.fixture
def client():
    return TestClient(app)
