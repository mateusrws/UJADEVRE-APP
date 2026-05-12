import type { Request } from "express";


export class AutenticatedRequestModel extends Request {
    user: {
        id: string,
        email: string,
        name: string,
        createdAt: string
    }
}