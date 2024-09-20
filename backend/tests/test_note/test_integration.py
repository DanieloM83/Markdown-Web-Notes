def test_success_create(client, post_info, account_cookies):
    client.cookies = account_cookies
    response = client.post("/notes", json=post_info)

    assert response.status_code == 200
    assert response.json()

    response = client.get("/notes")

    assert response.status_code == 200
    assert len(response.json()) == 1


def test_success_delete(client, post_info, account_cookies):
    client.cookies = account_cookies

    response = client.post("/notes", json=post_info)
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
    client.cookies = account_cookies

    response = client.post("/notes", json=post_info)
    note_id = response.json()["_id"]
    assert response.status_code == 200

    response = client.patch(f"/notes/{note_id}", json={"title": "New Title"})

    assert response.status_code == 200
    assert response.json()

    response = client.get("/notes")

    assert response.status_code == 200
    assert response.json()[0]["title"] == "New Title"
