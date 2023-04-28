import todoModel from "~/server/models/todo.model"

export default defineEventHandler(async (event) => {
    try {
        await todoModel.findByIdAndDelete(event.context.params!.id)
        return setResponse(event, { statusCode: 200, statusMessage: 'Item successfully deleted.' })
    } catch (error) {
        return setResponse(event, { statusCode: 500, statusMessage: 'Something went wrong.' })
    }
})