import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true, 
            trim: true, 
            unique: true 
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        level_no: { 
            type: Number, 
            required: true 
        } 
    },
    { timestamps: true }
);

const Subcategory = mongoose.model('Subcategory', subcategorySchema);
export default Subcategory;
