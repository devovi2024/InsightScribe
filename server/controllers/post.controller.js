import Post from "../models/post.model.js";
import Subcategory from "../models/subcategory.model.js";

/**
 * Fetch all posts
 */
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts." });
  }
};

/**
 * Get a single post by ID
 */
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate("user");
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch post details." });
  }
};

/**
 * Fetch posts by subcategory ID
 */
export const getPostsBySubcategory = async (req, res) => {
  try {
    const posts = await Post.find({ subcategory: req.params.id }).populate("user");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts for subcategory." });
  }
};

/**
 * Fetch posts by subcategory slug
 */
export const getPostsBySubcategorySlug = async (req, res) => {
  try {
    const subcategory = await Subcategory.findOne({ slug: req.params.slug });
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found." });
    }
    const posts = await Post.find({ subcategory: subcategory._id }).populate("user");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts for subcategory slug." });
  }
};

/**
 * Create a new post
 */
export const createPost = async (req, res) => {
    const { title, content, category, subcategory, user, tags } = req.body;
  
    if (!title || !content || !category || !subcategory || !user) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      // Check if a post with the same title already exists
      const existingPost = await Post.findOne({ title });
      if (existingPost) {
        return res.status(400).json({ message: "A post with this title already exists" });
      }
  
      // Create a new post
      const newPost = await Post.create({
        title,
        content,
        category,
        subcategory,
        user,
        tags,
      });
  
      return res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error.message);
      return res.status(500).json({ message: "Failed to create post", error: error.message });
    }
  };
  
/**
 * Fetch post details along with related posts
 */
export const getPostDetails = async (req, res) => {
  try {
    const { postId } = req.params;

    // Fetch the post details
    const post = await Post.findById(postId)
      .populate("category")
      .populate("tags");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Fetch related posts
    const relatedPosts = await Post.find({
      _id: { $ne: postId },
      $or: [{ category: post.category._id }, { tags: { $in: post.tags } }],
    }).limit(5);

    res.json({
      post,
      relatedPosts,
    });
  } catch (error) {
    console.error("Error fetching post details:", error);
    res.status(500).json({ message: "Server error" });
  }
};
