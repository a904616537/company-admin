const config  = require('../../setting/config'),
mongoose      = require('mongoose'),
banner_mongo = mongoose.model('banner'),
dateTime      = require('../helpers/dateTime');

module.exports = {
	// 获取所有公司信息
	Get(type, callback) {
		banner_mongo.find({type})
		.sort({order: 1, createTime: -1})
		.exec((err, banner) => {
			console.log(banner)
			callback(banner)
		})
	},
	Insert(banner) {
		return new Promise((resolve, reject) => {
			banner_mongo.create(banner, (err, doc) => {
				if(err) return reject(err);
				resolve(doc);
			})
        })
	},
	Update(banner) {
		return new Promise((resolve, reject) => {
			const _id = banner._id;
			delete banner._id;
			if(banner.imgurl == '' || (!banner.imgurl)) delete banner.imgurl;
			banner_mongo.update({_id}, banner, err => {
				if(err) return reject(err)
				resolve();
			})
        })
	},
	Delete(_id) {
		return new Promise((resolve, reject) => {
			banner_mongo.findOne({_id})
			.exec((err, banner) => {
				console.log('banner', banner)
				if(banner) {
					banner.remove(err => {
						if(err) return reject(err);
						resolve();
					})
				} else return reject();
				
			})
		})
	},
	SelectById(_id) {
		return new Promise((resolve, reject) => {
			banner_mongo.findOne({_id})
			.exec((err,docs) => {
				if (err) return reject(err);
				console.log(docs)
				resolve(docs);
			})
        })
	}
}
