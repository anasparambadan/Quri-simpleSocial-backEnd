
import mongoose from "mongoose";
import postModel from "../models/postModel.js";

//create post

export const createPost = async (req, res) => {
    const newPost = new postModel(req.body)
    
    
    try {
        if(req.body.image || req.body.caption){
            await newPost.save()
           await res.status(200).json(newPost)
        }
        else{
            res.status(404).send('Nothing to post')
        }
       
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

//get post

export const getPost = async (req, res) => {
    const id = req.params.id

    try {
        const post = await postModel.findById(id)
        res.status(200).json(post)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

//edit post

export const editPost = async (req, res) => {
    const id = req.params.id
    const { userId } = req.body
    try {
        const post = await postModel.findById(id)
        await post.updateOne({ $set: req.body })

        const posts = await postModel.find({ userId:userId }).sort({
            createdAt: -1
        })
        res.status(200).json({ posts, message: "Post Updated" })

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}


//delete post

export const deletpost = async (req, res) => {
    const id = req.params.id
    const {userId} = req.body
   


    try {
        const post = await postModel.findById(id)
        await post.deleteOne()
        const posts = await postModel.find({ userId:userId }).sort({
            createdAt: -1
        })
    
        res.status(200).json({posts, message: "post Deleted" })

    } catch (error) {

        res.status(500).json({ message: error.message })
    }
}

export const getAllPosts = async (req, res) => {
    const userId = req.params.id
    try {
        const posts = await postModel.find({ userId }).sort({
            createdAt: -1
        })
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

