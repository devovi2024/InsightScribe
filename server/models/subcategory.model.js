import mongoose from "mongoose";
import slugify from "slugify";

const SubcategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    level_no: { type: Number, required: true },
    slug: { type: String, unique: true },
}, { timestamps: true });

SubcategorySchema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

const Subcategory = mongoose.model("Subcategory", SubcategorySchema);
export default Subcategory;
