'use strict';
const config  = require('../../setting/config'),
mongoose      = require('mongoose'),
setting_mongo = mongoose.model('setting'),
dateTime      = require('../helpers/dateTime');

module.exports = {
	// 获取所有新闻
	getAll(type, callback) {
		setting_mongo.find({type})
		.exec(callback)
	},
	Update(key, type, value, lang, callback) {
		setting_mongo.findOne({key, type, lang}, (err, setting) => {
			if(setting) {
				setting.value = value;
				setting.save(callback);
			} else setting_mongo.create({key, type, value, lang}, callback)
		})
	}
}
