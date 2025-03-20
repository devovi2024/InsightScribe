import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        level_no: { type: Number, required: true }, 
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
