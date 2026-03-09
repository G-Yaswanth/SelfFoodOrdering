import MenuItem from "../models/MenuItem.js";

export const getMenu = async (req, res) => {
  try {
    const menu = await MenuItem.find({ available: true });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu" });
  }
};


export const createMenuItem = async (req, res) => {
  try {
    const { name, price, image, category } = req.body;

    const item = new MenuItem({
      name,
      price,
      image,
      category
    });

    await item.save();

    res.status(201).json(item);

  } catch (error) {
    res.status(500).json({ message: "Failed to create menu item" });
  }
};