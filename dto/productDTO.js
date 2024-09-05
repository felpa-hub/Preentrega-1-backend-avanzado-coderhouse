class ProductDTO {
    constructor({ _id, title, description, code, price, stock, category, thumbnails }) {
        this.id = _id;
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
    }
}

module.exports = ProductDTO;
