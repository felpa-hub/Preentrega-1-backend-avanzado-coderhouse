const ProductDAO = require('../dao/productDAO');
const ProductDTO = require('../dto/productDTO');

class ProductRepository {
    async getAllProducts(filter, sort, limit, page) {
        const products = await ProductDAO.getAll(filter, sort, limit, page);
        return products.map(product => new ProductDTO(product));
    }

    async getProductById(id) {
        const product = await ProductDAO.getById(id);
        return new ProductDTO(product);
    }

    async createProduct(productData) {
        const product = await ProductDAO.create(productData);
        return new ProductDTO(product);
    }

    async updateProduct(id, productData) {
        const product = await ProductDAO.update(id, productData);
        return new ProductDTO(product);
    }

    async deleteProduct(id) {
        return await ProductDAO.delete(id);
    }
}

module.exports = new ProductRepository();
