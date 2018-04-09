'use strict';
const config = require('../../setting/config'),
mongoose     = require('mongoose'),
bullet_mongo = mongoose.model('bullet'),
dateTime     = require('../helpers/dateTime');

module.exports = {
	// 获取所有新闻
	getBullet(callback) {
		bullet_mongo.find({})
		.sort({top: -1, createTime: -1})
		.exec((err, bullet) => {
			console.log(bullet)
			callback(bullet)
		})
	},
	Insert(bullet) {
		return new Promise((resolve, reject) => {
			bullet_mongo.create(bullet, (err, doc) => {
				if(err) return reject(err);
				resolve(doc);
			})
        })
	},
	Update(bullet) {
		return new Promise((resolve, reject) => {
			const _id = bullet._id;
			delete bullet._id;
			bullet_mongo.update({_id}, bullet, err => {
				if(err) return reject(err)
				resolve();
			})
        })
	},
	Delete(_id) {
		return new Promise((resolve, reject) => {
			bullet_mongo.findOne({_id})
			.exec((err, bullet) => {
				if(bullet) {
					bullet.remove(err => {
						if(err) return reject(err);
						resolve();
					})
				} else return reject();
				
			})
		})
	},
	SelectById(_id) {
		return new Promise((resolve, reject) => {
			bullet_mongo.findOne({_id}).exec((err,docs) => {
				if (err) return reject(err);
				resolve(docs);
			})
        })
	}
}
