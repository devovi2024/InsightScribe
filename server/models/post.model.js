import mongoose from "mongoose";
// import slugify from "slugify";

// const postSchema = new mongoose.Schema({
//   title: { type: String, required: true, trim: true, unique: true },
//   slug: { type: String, unique: true },
//   excerpt: { type: String, trim: true },
//   content: { type: String, required: true },
//   category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
//   subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory", required: true },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   tags: [{ type: String }],
//   views: { type: Number, default: 0 },
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   comments: [
//     {
//       user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//       text: { type: String, required: true },
//       createdAt: { type: Date, default: Date.now },
//     },
//   ],
//   status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
//   isFeatured: { type: Boolean, default: false },
//   readingTime: { type: String },
// }, { timestamps: true });

// // Pre-save hook for generating slug, excerpt, and reading time
// postSchema.pre("save", function (next) {
//   this.slug = slugify(this.title, { lower: true, strict: true });

//   if (!this.excerpt) {
//     this.excerpt = this.content.substring(0, 150) + "...";
//   }

//   const wordCount = this.content.split(" ").length;
//   this.readingTime = `${Math.ceil(wordCount / 200)} min read`;

//   next();
// });

// // Method to fetch related posts based on category or tags
// postSchema.statics.getRelatedPosts = function (postId, category, tags = []) {
//   return this.find({
//     _id: { $ne: postId }, // Exclude the current post
//     $or: [
//       { category: category }, // Match posts by category
//       { tags: { $in: tags } }, // Match posts by tags
//     ],
//   }).limit(5); // Limit the number of related posts to 5 (you can adjust this)
// };

// const Post = mongoose.model("Post", postSchema);
// export default Post;



const postSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },  
    slug: { type: String, unique: true },
    excerpt: { type: String, trim: true },
    content: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
    isFeatured: { type: Boolean, default: false },
    readingTime: { type: String },
  }, { timestamps: true });
  
  const Post = mongoose.model("Post", postSchema);
export default Post;