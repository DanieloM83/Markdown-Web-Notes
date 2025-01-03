def test_create(client, post_info):
    response = client.post("/notes", json={k:v for k,v in post_info.items() if k != "_id"})

    assert response.status_code == 401
    assert response.json()["detail"] == "You are not logged in."


def test_get(client):
    response = client.get("/notes")

    assert response.status_code == 401
    assert response.json()["detail"] == "You are not logged in."


def test_update(client, post_info):
    response = client.patch("/notes", json=[post_info])

    assert response.status_code == 401
    assert response.json()["detail"] == "You are not logged in."


def test_delete(client):
    response = client.delete("/notes/abcdef123456")

    assert response.status_code == 401
    assert response.json()["detail"] == "You are not logged in."
