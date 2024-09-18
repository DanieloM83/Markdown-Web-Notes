from typing import List

from fastapi import APIRouter, Depends

from schemas.note import NoteSchema, NoteWithoutMetaSchema, PartialNoteWithoutMetaSchema
from routers.auth import get_user
from schemas.user import UserSchema
from services.note import NoteService

router = APIRouter(prefix="/notes", tags=["note handlers"])


@router.post("")
async def create_note(
        note: NoteWithoutMetaSchema,
        user: UserSchema = Depends(get_user),
        service: NoteService = Depends(NoteService)
) -> NoteSchema:
    created_note = await service.create_note(note, user)
    return created_note


@router.get("")
async def get_notes(
        user: UserSchema = Depends(get_user),
        service: NoteService = Depends(NoteService)
) -> List[NoteSchema]:
    notes = await service.get_users_notes(user)
    return notes


@router.patch("/{id_}")
async def update_note(
        id_: str,
        note: PartialNoteWithoutMetaSchema,
        user: UserSchema = Depends(get_user),
        service: NoteService = Depends(NoteService)
):
    result = await service.update_note(id_, note, user)
    return {"success": result}


@router.delete("/{id_}")
async def delete_note(
        id_: str,
        user: UserSchema = Depends(get_user),
        service: NoteService = Depends(NoteService)
):
    result = await service.delete_note(id_, user)
    return {"success": result}