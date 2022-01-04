const express = require("express");
const router = express.Router();
const {AuthenticateUser}  = require('../authorization');
const OrderController = require('../controller/orderController')

router.get('/',AuthenticateUser, OrderController.getAllOrders);

router.post('/',AuthenticateUser, OrderController.createOrder);

router.get('/:orderId',AuthenticateUser, OrderController.getOrderById);

router.delete('/:orderId',AuthenticateUser, OrderController.deleteOrder);

module.exports = router;