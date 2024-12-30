import pytest


@pytest.fixture
def post_info():
    return {"_id": "abcdef123456",
            "title": "Note №1",
            "description": "Test note number 1.",
            "content": "#Title\n##Subtitle",
            "color": "#FF6E6E",
            "coordinates": (0.5, 0.25)}


@pytest.fixture
def account_cookies(client, user_creds):
    client.post("/auth/register", json=user_creds)
    response = client.post("/auth/login", json=user_creds)

    return response.cookies
