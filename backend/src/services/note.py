from typing import List

from fastapi import Depends

from repos.note import NoteRepository
from schemas.default import ObjectIdSupported
from schemas.note import NoteWithoutIdSchema, NoteWithoutMetaSchema, NoteSchema, PartialNoteWithoutMetaSchema, \
    PartialNoteWithIdSchema
from schemas.user import UserSchema
from exceptions.note import AuthorVerifyingError


class NoteService:
    def __init__(self, repository: NoteRepository = Depends(NoteRepository)):
        self.repo = repository

    async def verify_author(self, note_id: ObjectIdSupported, author_id: ObjectIdSupported) -> None:
        note = await self.repo.get_note_by_id(note_id)
        if not note or note.author_id != str(author_id):
            raise AuthorVerifyingError()

    async def create_note(self, note: NoteWithoutMetaSchema, user: UserSchema) -> NoteSchema:
        note = NoteWithoutIdSchema(**note.model_dump(), author_id=user.id)
        return await self.repo.create_note(note)

    async def get_users_notes(self, user: UserSchema) -> List[NoteSchema]:
        return await self.repo.get_notes_by_author_id(str(user.id))

    async def update_note(self, id_: ObjectIdSupported, data: PartialNoteWithoutMetaSchema, user: UserSchema) -> bool:
        await self.verify_author(id_, user.id)
        return await self.repo.update_note(id_, data)

    async def update_notes_bulk(self, notes: List[PartialNoteWithIdSchema], user: UserSchema):
        result = {}
        for note in notes:
            try:
                data = PartialNoteWithoutMetaSchema(**{k: v for k, v in note.model_dump().items() if k != "_id"})
                result[str(note.id)] = "Success." if (await self.update_note(note.id, data, user)) else "No changes."
            except AuthorVerifyingError as e:
                result[str(note.id)] = e.detail
        return result

    async def delete_note(self, id_: ObjectIdSupported, user: UserSchema) -> bool:
        await self.verify_author(id_, user.id)
        return await self.repo.delete_note(id_)
