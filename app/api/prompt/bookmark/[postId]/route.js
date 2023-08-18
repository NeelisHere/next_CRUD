import PromptModel from "../../../../../models/prompt"
import { connectDB } from "../../../../../utils/db"


export const PATCH = async (req, { params }) => {
    const { bookmarkStatus } = await req.json()
    try {
        await connectDB()
        const post = await PromptModel.findById(params.postId)
        post.isBookmarked = bookmarkStatus
        await post.save()
        // console.log(post)
        return new Response(JSON.stringify(post), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response('Error updating.', { status: 500 })
    }

}