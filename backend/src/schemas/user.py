from pydantic import BaseModel, field_validator

from schemas.default import MongoObject


class UsernameSchema(BaseModel):
    username: str

    @field_validator("username")
    def username_validator(cls, value):
        if len(value) > 20:
            raise ValueError("Wrong username format: Username must be shorter than 20 characters!")

        return value


class PasswordSchema(BaseModel):
    password: str

    @field_validator("password")
    def password_validator(cls, value):
        if len(value) < 8:
            raise ValueError("Wrong password format: Password must be longer than or equal to 8 characters!")

        if not any(char.isupper() for char in value):
            raise ValueError("Wrong password format: Password must contain at least one uppercase letter!")

        if not any(char.islower() for char in value):
            raise ValueError("Wrong password format: Password must contain at least one lowercase letter!")

        if not any(char.isdigit() for char in value):
            raise ValueError("Wrong password format: Password must contain at least one digit!")

        return value


class HashedPasswordSchema(BaseModel):
    password: str

    @field_validator("password")
    def password_validator(cls, value):
        return value


class UserCredentialsSchema(UsernameSchema, PasswordSchema):
    pass


class UserWithoutIDSchema(UsernameSchema, HashedPasswordSchema):
    pass


class UserSchema(UserWithoutIDSchema, MongoObject):
    pass
