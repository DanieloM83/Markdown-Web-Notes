from fastapi import HTTPException, status


class AuthorVerifyingError(HTTPException):
    def __init__(self,
                 status_code: int = status.HTTP_403_FORBIDDEN,
                 detail: str = "You are note the author of this note."):
        super().__init__(status_code, detail)


class InvalidObjectIdError(HTTPException):
    def __init__(self,
                 status_code: int = status.HTTP_404_NOT_FOUND,
                 detail: str = "Note with the specified identifier was not found."):
        super().__init__(status_code, detail)
