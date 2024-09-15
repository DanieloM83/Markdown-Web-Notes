import pytest


@pytest.fixture
def user_creds():
    return {"username": "fakeuser123", "password": "Fakeuser123"}
