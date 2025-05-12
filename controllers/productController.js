import Product from "../models/Product.js";

export const addProduct = async (req,res) => {
    const { name,  category, new_price, old_price, available } = req.body;

    if (!name  || !category || new_price == null || old_price == null || available == null) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (typeof new_price !== 'number' || typeof old_price !== 'number') {
        return res.status(400).json({ error: 'Prices must be numbers' });
    }

    try {
        const product = new Product({
            name,
            category,
            new_price,
            old_price,
            available
        });

        await product.save();
        console.log('Product saved:', product);

        res.json({
            success: 1,
            name: product.name,
        });
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({ error: 'An error occurred while saving the product' });
    }

}
