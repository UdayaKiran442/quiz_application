# 1. To run backend project

## Clone github repository
```sh
git clone https://github.com/UdayaKiran442/quiz_application
```

## Install dependencies
```sh
cd backend
```

```sh
bun install
```

## Run server

### For development environment
```sh
bun run dev
```

### For production environment
```sh
bun run prod
```

-------------------------------------

# 2. Migration Script for running drizzle schemas
```sh
npx drizzle-kit generate
```

# 3. Folder Structure

src/
├── controllers/
├── exceptions/
├── repositories/
├── routes/
├── services/
├── utils/
└── index.ts
└── README.md
└── drizzle.config.ts
└── .env.*
└── package.json
└── tsconfig.json
└── .gitignore

## 3.1 Controllers

- Use dot notation for controller names.
- Example user.controller.ts.
- Controllers are used to handle the business logic of the application, to call services or repositories.

## 3.2 Exceptions

- Use dot notation for exception names.
- Example user.exception.ts.
- Exceptions are used to handle the errors that occur in the application.
- Use PascalCase for exception names.
- Example AddUserError.

## 3.3 Repositories
- Use dot notation for repository names.
- Example quiz.repository.ts.
- Repositories are used to handle the database operations of the applications, such as adding, updating, deleting, and fetching data from the database.
- Core business logic should not be present in repositories, only database operations should be present.
- Use camelCase for repository names.
- Example addUserInDB.

## 3.4 Routes
- Use dot notation for route names.
- Example user.route.ts.
- Routes are used to handle the routing of the application.
- Use zod to validate the request body and to create schema for the payload.
- Routes are versioned.
- Example /api/v1/auth/login.
- While creating a new version of any route always write it in the new version folder.
- Example if v3 version of auth route is created, write it in src/routes/v3/auth/auth.route.ts.

## 3.5 Services
- Use dot notation for service names.
- Example user.service.ts .
- Services are used to call third party APIs such as openai, google, pinecone, etc.

## 3.6 Utils
- Use dot notation for utility names.
- Example user.utils.ts.
- Utilities are used to handle reusable functions of the application.

## 3.7 Index
- Contains core server of the application.
- Handles the routing of the application, cors and other middleware.

## 3.8 README.md
- Contains the documentation of the application.
- Includes installation and setup instructions, api documentation, and other relevant information.

## 3.9 drizzle.config.ts
- Contains the configuration for drizzle.
- Drizzle config is used to generate the sql queries for the database as per the schema.

## 3.10 .env
- Contains the environment variables for the application.
- Should not be committed to the repository.

## 3.11 package.json
- Contains the dependencies and scripts for the application.

## 3.12 tsconfig.json
- Contains the configuration for typescript.

## 3.13 .gitignore
- Contains the files and directories that should not be committed to the repository.
