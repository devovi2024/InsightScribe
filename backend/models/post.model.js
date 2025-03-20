import mongoose from 'mongoose';
import slugify from 'slugify';

const postSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true, 
            trim: true, 
            unique: true 
        },
        slug: {
            type: String,
            unique: true
        },
        excerpt: {
            type: String, 
            trim: true 
        },
        content: { 
            type: String, 
            required: true 
        },
        image: {
            small: { type: String },
            medium: { type: String },
            large: { type: String },
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subcategory',
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        tags: [{ type: String }],
        views: { type: Number, default: 0 },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        comments: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                text: { type: String, required: true },
                createdAt: { type: Date, default: Date.now }
            }
        ],
        status: { 
            type: String, 
            enum: ['draft', 'published', 'archived'], 
            default: 'draft' 
        },
        isFeatured: { type: Boolean, default: false },
        scheduledPublishDate: { type: Date, default: null },
        readingTime: { type: String },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);


postSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true, strict: true });

    if (!this.excerpt) {
        this.excerpt = this.content.substring(0, 150) + '...';
    }

    const wordCount = this.content.split(' ').length;
    this.readingTime = `${Math.ceil(wordCount / 200)} min read`;

    next();
});


const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;
