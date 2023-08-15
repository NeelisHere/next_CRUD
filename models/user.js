import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already in use'],
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        required: [true, 'username is required']
    },
    image: {
        type: String
    }
})

const UserModel = models.User || model('User', UserSchema)

export default UserModel