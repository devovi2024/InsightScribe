import Subcategory from "../models/subcategory.model.js";

export const getSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find().populate("category");
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createSubcategory = async (req, res) => {
    try {
        const { name, category, level_no } = req.body;
        
        if (!name || !category || level_no === undefined) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newSubcategory = new Subcategory({ name, category, level_no });
        await newSubcategory.save();
        res.status(201).json(newSubcategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
