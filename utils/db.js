import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    mongoose.set('strictQuery', true)
    if(isConnected) {
        console.log('MongoDB already connected')
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true;
        console.log('MongoDB connected')

    } catch (error) {
        console.log(error)
    }
}