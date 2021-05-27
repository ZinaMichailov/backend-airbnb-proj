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
		const collection = await dbService.getCollection('stay');
		const stays = await collection.find().toArray();
		return stays;
	} catch (err) {
		logger.error('cannot find stays', err);
		throw err;
	}
}

async function getById(stayId) {
	try {
		const collection = await dbService.getCollection('stay');
		const stay = await collection.findOne({ _id: ObjectId(stayId) });
		return stay;
	} catch (err) {
		logger.error(`while finding stay ${stayId}`, err);
		throw err;
	}
}

async function remove(stayId) {
	try {
		const collection = await dbService.getCollection('stay');
		await collection.deleteOne({ _id: ObjectId(stayId) });
	} catch (err) {
		logger.error(`cannot remove stay ${stayId}`, err);
		throw err;
	}
}

async function update(stay) {
	try {
		const stayToSave = {
			_id: ObjectId(stay._id),
			name: stay.name,
			imgUrls: stay.imgUrls,
			price: stay.price,
			summery: stay.summery,
			properties: stay.properties,
			amenities: stay.amenities,
			host: stay.host,
			loc: stay.loc,
			reviews: stay.reviews,
		};
		const collection = await dbService.getCollection('stay');
		await collection.updateOne({ _id: stayToSave._id }, { $set: stayToSave });
		return stayToSave;
	} catch (err) {
		logger.error(`cannot update user ${stay._id}`, err);
		throw err;
	}
}

async function add(stay) {
	try {
		const stayToAdd = {
			name: stay.name,
			imgUrls: stay.imgUrls,
			price: stay.price,
			summery: stay.summery,
			properties: stay.properties,
			amenities: stay.amenities,
			host: stay.host,
			loc: stay.loc,
			reviews: stay.reviews,
		};
		const collection = await dbService.getCollection('stay');
		await collection.insertOne(stayToAdd);
		return stayToAdd;
	} catch (err) {
		logger.error('cannot insert stay', err);
		throw err;
	}
}

function _buildCriteria(filterBy) {
	const criteria = {};
	// if (filterBy.txt) {
	//     const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
	//     criteria.$or = [
	//         {
	//             username: txtCriteria
	//         },
	//         {
	//             fullname: txtCriteria
	//         }
	//     ]
	// }
	// if (filterBy.name) {
	//     const txtCriteria = { $regex: filterBy.name, $options: 'i' };
	//     criteria.name = txtCriteria;
	// }
	// if (filterBy.stock !== 'All') criteria.inStock = JSON.parse(filterBy.stock);
	// if (filterBy.type !== 'All') criteria.type = filterBy.type;
	return criteria;
}
