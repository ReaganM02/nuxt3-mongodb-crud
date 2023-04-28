import todoModel from "~/server/models/todo.model"
import { ITodo } from "~/types"

export default defineEventHandler(async (event) => {
    try {
        const body: ITodo = await readBody(event)
        await todoModel.findByIdAndUpdate<ITodo>({ _id: event.context.params!.id }, { item: body.item })
        return setResponse(event, { statusCode: 200, statusMessage: 'Item is updated.' })
    } catch (error) {
        console.log(error)
        return setResponse(event, { statusCode: 500, statusMessage: 'Something went wrong.' })
    }
})