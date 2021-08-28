const express = require('express');  
const Order = require('../models/orderModel'); 
const {isAuth, isAdmin} = require('../util');

const router = express.Router(); 

router.post("/", isAuth, async (req, res) => { 
    if(req.body.orderItems === 0){ 
        res.status(400).send({msg : 'cart is empty'})
    } else{ 
          const newOrder = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
    }); 
      const newOrderCreated = await newOrder.save();
    res.status(201).send({ message: "New Order Created", data: newOrderCreated });
    }
  }); 

  router.get("/mine", isAuth, async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  });

  router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
      const deletedOrder = await order.remove();
      res.send(deletedOrder);
    } else {
      res.status(404).send("Order Not Found.")
    }
  }); 

  module.exports = router;