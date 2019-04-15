const mongoose = require('mongoose');
const util = require('../util');
const mongodb = require('../core/db/mongodb');
const catalogNames = require('../config/constants').catalogs; ;
// 费用分类
const catalogSchema = new mongoose.Schema(
	{
		year: Number,
		id: String,
		name: String
	}, {
		collection: 'catalogs',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Catalogs = mongodb.model('catalogs', catalogSchema);

function init () {
	let year = (new Date()).getFullYear();
	let promiseArray = [];
	for (let name of catalogNames) {
		let promise = Catalogs.findOne({ year, name })
			.then(catalog => {
				if (catalog) return;
				return Catalogs.create({
					id: util.genCatalogId(),
					year,
					name
				});
			});
		promiseArray.push(promise);
	}
	return Promise.all(promiseArray);
}

init().then(() => { console.log('初始化catalog成功'); }).catch(error => console.log(error));

module.exports = Catalogs;
