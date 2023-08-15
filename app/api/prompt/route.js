const { default: PromptModel } = require("../../../models/prompt");
const { connectDB } = require("../../../utils/db");

export const GET = async (req) => {
    try {
        await connectDB()
        const prompts = await PromptModel.find({}).populate('creator')
        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response('Error fetching prompts', {status: 500})
    }
}

