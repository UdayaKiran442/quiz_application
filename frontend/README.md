# 1. To run frontend project

## Clone github repository
```sh
git clone https://github.com/UdayaKiran442/quiz_application
```

## Install dependencies
```sh
cd quiz_application
cd frontend
```

```sh
bun install
```

## Run server

### For development environment
```sh
bun run dev
```
Server will start running in port 3000

# 2. Folder Structure
src/
├── actions/
├── app/
    ├── layout.tsx
    ├── page.tsx
    ├── create-quiz/
    ├── quiz/
    ├── reports/
├── components/
├── lib/
├── type/
└── README.md
└── package.json
└── tsconfig.json

## 2.1 Actions
- This folder contains server actions and all api calls required to be done by client to server.
- API calls defined in actions and called in a server component will not be viisble to user in network tab.

## 2.2 App
- This is the entry point of the app.
- Default route '/' will be redirected to page.tsx in app folder.
- Every folder in app defines a route.
- For example folder create-quiz is a route, all requests with path name /create-quiz will be redirected to this folder.
- Learn more about **App Routing** in **NextJS 15** https://nextjs.org/docs/app/getting-started/layouts-and-pages .

## 2.3 Components
- All UI client components will be in this folder.
- These are rendered to client.

## 2.4 lib
- Utility functions which can be re-used will be present here.

## 2.5 types
- Types of various functions input and output will be defined here as interface.
- Example 
```sh
export interface IGreetResponse{
    reply: string
}

export interface IGreetPayload{
    message: string
}
function greetAPI(payload: IGreetPayload): Promise<IGreetResponse>{}
```

## 2.6 README.md
- All documentation related to code, folder structure, other details will be present here. 