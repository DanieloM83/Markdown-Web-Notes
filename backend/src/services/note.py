from typing import List

from fastapi import Depends

from repos.note import NoteRepository
from schemas.default import ObjectIdSupported
from schemas.note import NoteWithoutIdSchema, NoteWithoutMetaSchema, NoteSchema, PartialNoteWithoutMetaSchema
from schemas.user import UserSchema


class NoteService:
    def __init__(self, repository: NoteRepository = Depends(NoteRepository)):
        self.repo = repository

    async def verify_author(self, note_id: ObjectIdSupported, author_id: ObjectIdSupported) -> None:
        note = await self.repo.get_note_by_id(note_id)
        if note.author_id != author_id.__str__():
            raise ValueError("Forbidden.")

    async def create_note(self, note: NoteWithoutMetaSchema, user: UserSchema) -> NoteSchema:
        note = NoteWithoutIdSchema(**note.model_dump(), author_id=user.id)
        return await self.repo.create_note(note)

    async def get_users_notes(self, user: UserSchema) -> List[NoteSchema]:
        return await self.repo.get_notes_by_author_id(user.id.__str__())

    async def update_note(self, id_: ObjectIdSupported, data: PartialNoteWithoutMetaSchema, user: UserSchema) -> bool:
        await self.verify_author(id_, user.id)
        return await self.repo.update_note(id_, data)

    async def delete_note(self, id_: ObjectIdSupported, user: UserSchema) -> bool:
        await self.verify_author(id_, user.id)
        return await self.repo.delete_note(id_)
