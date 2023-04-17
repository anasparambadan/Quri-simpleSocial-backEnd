import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            
        },
        image: {
            type: String,

        },
        caption: {
            type: String
        }
    },
    { timestamps: true }
)

const postModel = mongoose.model("posts", postSchema)
export default postModel