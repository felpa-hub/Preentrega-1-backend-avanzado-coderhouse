const Product = require('../models/product');

class ProductDAO {
    async getAll(filter, sort, limit, page) {
        const products = await Product.find(filter)
            .sort(sort)
            .limit(limit)
            .skip((page - 1) * limit);
        return products;
    }

    async getById(id) {
        return await Product.findById(id);
    }

    async create(productData) {
        const newProduct = new Product(productData);
        return await newProduct.save();
    }

    async update(id, productData) {
        return await Product.findByIdAndUpdate(id, productData, { new: true });
    }

    async delete(id) {
        return await Product.findByIdAndDelete(id);
    }
}

module.exports = new ProductDAO();
