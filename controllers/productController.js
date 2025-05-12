import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  const { name, category, new_price, old_price, available } = req.body;

  if (
    !name ||
    !category ||
    new_price == null ||
    old_price == null ||
    available == null
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (typeof new_price !== "number" || typeof old_price !== "number") {
    return res.status(400).json({ error: "Prices must be numbers" });
  }

  try {
    const product = new Product({
      name,
      category,
      new_price,
      old_price,
      available,
    });

    await product.save();
    console.log("Product saved:", product);

    res.json({
      success: 1,
      name: product.name,
    });
  } catch (error) {
    console.error("Error saving product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const result = await Product.findOneAndDelete({ _id: req.body.id });
    if (result) {
      console.log("product rempved successfuly");
      res.json({ success: true, name: result.name });
    } else {
      res.status(404).json({ error: "product not deleted try again" });
    }
  } catch (error) {
    console.error("error...");
    res.status(500).json({ error: "it was a server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    if (products) {
      res.status(200).json({ products });
    } else {
      res.status(404).json({ error: "error to fetch prodts from data base" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server errror" });
  }
};

export const getMens = async (req, res) => {
  try {
    const products = await Product.find({ category: "men" });

    if (products) {
      res.status(200).json({ products });
    } else {
      res.status(404).json({ error: "error to fetch prodts from data base" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server errror" });
  }
};
