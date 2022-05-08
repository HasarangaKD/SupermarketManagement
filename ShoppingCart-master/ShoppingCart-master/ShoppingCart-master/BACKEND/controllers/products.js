const Products = require("../models/products");

exports.getAllProducts = async (req , res)=>{
    try {
        const products = await Products.find({});
        res.json(products);

    } catch (error) {
        console.error(error);
        res.send(500).json({message  : "Server Error"});
    }
}

exports.getProductById = async (req , res)=>{
    try {
        const product = await Products.findById(req.params.id);
        res.json(product);

    } catch (error) {
        console.error(error);
        res.send(500).json({message  : "Server Error"});
    }
}