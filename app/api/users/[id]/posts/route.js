import { connectDB } from "../../../../../utils/db";
import PromptModel from "../../../../../models/prompt";

export const GET = async (req, { params }) => {
    try {
        await connectDB()
        const prompts = await PromptModel.find({ creator: params.id }).populate('creator')
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response('Error fetching posts', { status: 500 })
    }
}