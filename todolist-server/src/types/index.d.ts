export {};

declare module 'express-session' {
    interface SessionData {
        userId:number
        userTest:string
    }
}