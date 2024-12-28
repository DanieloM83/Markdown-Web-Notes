from config import settings


def test_success_create(client, post_info, account_cookies):
    client.cookies.set(settings.SESSION_COOKIE_NAME, account_cookies[settings.SESSION_COOKIE_NAME])
    response = client.post("/notes", json={k: v for k, v in post_info.items() if k != "_id"})

    assert response.status_code == 200
    assert response.json()

    response = client.get("/notes")

    assert response.status_code == 200
    assert len(response.json()) == 1


def test_success_delete(client, post_info, account_cookies):
    client.cookies.set(settings.SESSION_COOKIE_NAME, account_cookies[settings.SESSION_COOKIE_NAME])

    response = client.post("/notes", json={k: v for k, v in post_info.items() if k != "_id"})
    note_id = response.json()["_id"]
    assert response.status_code == 200

    response = client.get("/notes")

    assert response.status_code == 200
    assert len(response.json()) == 1

    response = client.delete(f"/notes/{note_id}")

    assert response.status_code == 200
    assert response.json()

    response = client.get("/notes")

    assert response.status_code == 200
    assert len(response.json()) == 0


def test_success_update(client, post_info, account_cookies):
    client.cookies.set(settings.SESSION_COOKIE_NAME, account_cookies[settings.SESSION_COOKIE_NAME])

    response = client.post("/notes", json={k: v for k, v in post_info.items() if k != "_id"})
    note_id = response.json()["_id"]
    assert response.status_code == 200

    response = client.patch(f"/notes", json=[{"_id": note_id, "title": "New Title"}])

    assert response.status_code == 200
    assert response.json()

    response = client.get("/notes")

    assert response.status_code == 200
    assert response.json()[0]["title"] == "New Title"
