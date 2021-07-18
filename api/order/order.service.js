const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const socketService = require('../../services/socket.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
	query,
	getById,
	remove,
	update,
	add,
};

async function query() {
	try {
		const collection = await dbService.getCollection('order');
		const orders = await collection.find().toArray();
		return orders;
	} catch (err) {
		logger.error('cannot find orders', err);
		throw err;
	}
}

async function getById(orderId) {
	try {
		const collection = await dbService.getCollection('order');
		const order = await collection.findOne({ _id: ObjectId(orderId) });
		return order;
	} catch (err) {
		logger.error(`while finding order ${orderId}`, err);
		throw err;
	}
}

async function remove(orderId) {
	try {
		const collection = await dbService.getCollection('order');
		await collection.deleteOne({ _id: ObjectId(orderId) });
	} catch (err) {
		logger.error(`cannot remove order ${orderId}`, err);
		throw err;
	}
}

async function update(order) {
	try {
		const orderToSave = {
			_id: ObjectId(order._id),
			buyer: order.buyer,
			createdAt: order.createdAt,
			endDate: order.endDate,
			startDate: order.startDate,
			guests: order.guests,
			state: order.state,
			status: order.status,
			totalPrice: order.totalPrice
		};
		const collection = await dbService.getCollection('order');
		await collection.updateOne({ _id: orderToSave._id }, { $set: orderToSave });
		return orderToSave;
	} catch (err) {
		logger.error(`cannot update user ${order._id}`, err);
		throw err;
	}
}

async function add(order) {
	try {
		const orderToAdd = {
			buyer: order.buyer,
			createdAt: order.createdAt,
			endDate: order.endDate,
			startDate: order.startDate,
			guests: order.guests,
			state: order.state,
			status: order.status,
			totalPrice: order.totalPrice
		};
		const collection = await dbService.getCollection('order');
		await collection.insertOne(orderToAdd);
		return orderToAdd;
	} catch (err) {
		logger.error('cannot insert order', err);
		throw err;
	}
}
