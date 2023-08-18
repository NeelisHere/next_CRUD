import { connectDB } from "../../../../utils/db";
import UserModel from "../../../../models/user.js";

export const GET = async (req, { params }) => {
    try {
        await connectDB()
        const user = await UserModel.findById(params.id)
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response('Error fetching posts', { status: 500 })
    }
}