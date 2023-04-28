import { Types } from "mongoose"

export interface ISetResponse {
    statusCode: number
    statusMessage: string
    data?: any,
    cause?: any
}

export interface ITodo {
    _id: Types.ObjectId
    item: string,
    createdAt: Date,
    updatedAt: Date
}