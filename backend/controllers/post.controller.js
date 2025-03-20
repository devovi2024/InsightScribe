import Post from "../models/post.model.js";


export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("category subcategory user");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title, content, category, subcategory, user } = req.body;
        const newPost = new Post({ title, content, category, subcategory, user });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
