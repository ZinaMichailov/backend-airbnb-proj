const express = require('express')
const {getOrder, getOrders, deleteOrder, updateOrder, addOrder} = require('./order.controller')
const {requireAdmin} = require('../../middlewares/requireAuth.middleware')
const router = express.Router()

router.get('/', getOrders)
router.get('/:id', getOrder)
router.put('/:id', updateOrder)
router.post('/', addOrder)
router.delete('/:id', deleteOrder)

module.exports = router