import Category from "../models/category.model.js"; 

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name, level_no } = req.body;
        const newCategory = new Category({ name, level_no });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const editCategory = async (req, res) => {
    try{
        const {id} = req.params;
        const {name, level_no} = req.body;

        const updateCategory = await Category.findByIdAndUpdate(
            id,
            {name, level_no},
            {new: true, runValidators:true}
        );

        if (!updateCategory) {
            return res.status(400).json({message: "Category not found"});
        }
        res.status(200).json(updateCategory)
    } catch(error){
        res.status(500).json({message: error.message})
    }
}