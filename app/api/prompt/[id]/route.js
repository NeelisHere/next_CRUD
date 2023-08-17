import { connectDB } from "../../../../utils/db";
import PromptModel from "../../../../models/prompt";

export const GET = async (req, { params }) => {
    try {
        await connectDB()
        const prompt = await PromptModel.findById(params.id).populate('creator')
        if(!prompt) {
            return new Response('Prompt not found!', { status: 404 })
        }
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response('Error fetching post', { status: 500 })
    }
}

export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json()
    try {
        await connectDB()
        const existingPrompt = await PromptModel.findById(params.id)
        if(!prompt) {
            return new Response('Prompt not found!', { status: 404 })
        }
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        await existingPrompt.save()
        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response('Error updating.', { status: 500 })
    }
}

export const DELETE = async (req, { params }) => {
    try {
        await connectDB()
        await PromptModel.findByIdAndRemove(params.id)
        return new Response('Prompt deleted successfully', { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response('Error deleting.', { status: 500 })
    }
}
