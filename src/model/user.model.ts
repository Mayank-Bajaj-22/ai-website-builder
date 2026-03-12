import mongoose from "mongoose";

interface IUser {
    _id?: mongoose.Types.ObjectId,
    name: string,
    email: string,
    avatar?: string,
    credits?: number,
    plan?: string
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    avatar: {
        type: String
    },
    credits: {
        type: Number,
        default: 100,
        min: 0
    },
    plan: {
        type: String,
        enum: ["free", "pro", "enterprise"],
        default: "free"
    },
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;