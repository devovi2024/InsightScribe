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
  try {
    const { id } = req.params;
    const { name, level_no } = req.body;

    if (!name || !level_no) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, level_no },
      { new: true } 
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCategory = await Category.findByIdAndDelete(id);
  
      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };