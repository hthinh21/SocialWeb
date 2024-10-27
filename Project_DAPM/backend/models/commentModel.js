import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        articleID:{
            type: String,
            required: true
        },
        userID:{
            type: String,
            required: true
        },
        commentDetail:{
            type: String,
            required: true
        },
        publishDate:{
            type: Date,
            required: true
        }
    }
);
export const Comment = mongoose.model('Comment', commentSchema);