const express = require('express');
const Cart = require('../models/cart');
const Ticket = require('../models/ticket');
const ProductDAO = require('../dao/productDAO');
const router = express.Router();

router.post('/:cid/purchase', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate('products.product');
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        let totalAmount = 0;
        const unavailableProducts = [];

        for (const item of cart.products) {
            const product = item.product;
            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                totalAmount += product.price * item.quantity;
                await product.save();
            } else {
                unavailableProducts.push(product._id);
            }
        }

        const ticket = new Ticket({
            code: `TICKET-${Date.now()}`,
            purchase_datetime: new Date(),
            amount: totalAmount,
            purchaser: req.user.email // Asume que tienes el email del usuario en req.user
        });

        await ticket.save();

        res.json({
            status: 'success',
            ticket,
            unavailableProducts
        });

        // Limpiar carrito después de la compra
        cart.products = cart.products.filter(item => !unavailableProducts.includes(item.product._id));
        await cart.save();

    } catch (err) {
        res.status(500).json({ error: 'Error al procesar la compra' });
    }
});

module.exports = router;
