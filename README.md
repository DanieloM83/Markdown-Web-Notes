# Markdown Web Notes

**A fully implemented website with a user-friendly user interface and authorization for maintaining and editing notes in the markdown online.** 

**The following concepts were used during development:** Cookie session based authentication, RESTful API, Containerization with Docker, Nginx configuration, Reactive responsive UI, Automated testing and much more.

<img src="https://github.com/user-attachments/assets/72b1832b-85af-403b-a8f8-c0df1e6f85d2" alt="Main Preview">


## Project Structure and Technologies Used

The backend part is implemented using python as the main language:

- **FastAPI** - a modern framework for creating `web APIs`.
- **Pydantic** - a popular and convenient library for `data validation`.
- **Motor** - a coroutine-based API for non-blocking access to `MongoDB`.
- **Redis** - mainly for storing `auth sessions`, a coroutine-based redis is used.
- **Pytest** - a popular framework for `automated testing`.

```plaintext
backend
├── src
│   ├── database/    // mongo & redis clients generators
│   ├── exceptions/  // custom FastAPI exceptions
│   ├── repos/       // MongoDB CRUDs
│   ├── routers/     // web API endpoints
│   ├── schemas/     // pydantic validation schemas
│   └── services/    // business-logic implementation
│
└── tests
    ├── test_auth/   // auth-service tests
    └── test_note/   // note-service tests
```

The frontend part is implemented using typescript, html and pure css:

- **React** - is the javacript library for `web user interfaces`.
- **Yarn + vite** - as a `package manager` and `local dev server`.
- **React-router-dom** - declarative `routing` for React web apps.
- **React-hook-form** - convenient and flexible `forms` for React.
- **Zod** - a `schema declaration and validation` library.
- **React-markdown** - `render markdown` to React elements.

```plaintext
frontend
└── src
    ├── assets/      // images and global css
    ├── components/  // react components
    │   ├── routes/  // react-router-dom
    │   ├── screens/ // main components (used in routes)
    │   └── ui/      // small reusable components
    │
    ├── hooks/       // custom react hooks
    ├── providers/   // providers for global states
    └── services/    // API services calls and schemas
        ├── auth/    // auth-service
        └── note/    // note-service
```


## Screenshots

<div align="center">
<img src="https://github.com/user-attachments/assets/ad3b8e1c-dbda-4b41-91cc-58231f863a52" width=32% alt="Login Page">
<img src="https://github.com/user-attachments/assets/afed05b5-8e08-4540-89c8-13b5eeeeee21" width=32% alt="Playground">
<img src="https://github.com/user-attachments/assets/4a4b47bb-85b8-4979-a48e-8c2cf81b01a2" width=32% alt="Playground expanded">
<img src="https://github.com/user-attachments/assets/55b86af0-d05a-40d6-be67-6e18eae16832" width=49% alt="Edit Note Page">
<img src="https://github.com/user-attachments/assets/c91815ff-cf53-4b6e-b165-6d9722fa2067" width=49% alt="Display Page">
</div>


## Afterword

3-4 months is quite a long time for such a small application. However, the feeling of a completed project at the end of the year is worth all the effort and hard work. Some components may have non-critical bugs related to UI/UX or optimization that will be identified and fixed in the future.
