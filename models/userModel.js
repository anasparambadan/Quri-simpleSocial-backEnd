import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

const userModel = mongoose.model("users", userSchema)
export default userModel