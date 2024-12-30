def test_login(client, user_creds):
    response = client.post("/auth/login", json=user_creds)

    assert response.status_code == 401
    assert response.json()["detail"] == "Wrong username or password."


def test_logout(client):
    response = client.post("/auth/logout")

    assert response.status_code == 401
    assert response.json()["detail"] == "You are not logged in."


def test_register(client, user_creds):
    response = client.post("/auth/register", json=user_creds)

    assert response.status_code == 200
    assert response.json()["id"]


def test_get_current_user(client):
    response = client.get("/auth/current_user")

    assert response.status_code == 401
    assert response.json()["detail"] == "You are not logged in."
