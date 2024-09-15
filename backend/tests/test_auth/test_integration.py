def test_success_login(client, user_creds):
    response = client.post("/auth/register", json=user_creds)

    assert response.status_code == 200
    assert response.json()["id"]

    response = client.post("/auth/login", json=user_creds)

    assert response.status_code == 200
    assert len(response.cookies) == 1


def test_success_logout(client, user_creds):
    response = client.post("/auth/register", json=user_creds)

    assert response.status_code == 200
    assert response.json()["id"]

    response = client.post("/auth/login", json=user_creds)
    cookies = response.cookies

    assert response.status_code == 200
    assert len(response.cookies) == 1

    response = client.post("/auth/logout")
    client.cookies = cookies

    assert response.status_code == 200
    assert response.headers.get("set-cookie")


def test_success_get_current_user(client, user_creds):
    response = client.post("/auth/register", json=user_creds)

    assert response.status_code == 200
    assert response.json()["id"]

    response = client.post("/auth/login", json=user_creds)
    cookies = response.cookies

    assert response.status_code == 200
    assert len(response.cookies) == 1

    client.cookies = cookies
    response = client.get("/auth/current_user")

    assert response.status_code == 200
    assert response.json()["username"] == user_creds["username"]
