'use strict';
const config  = require('../../setting/config'),
mongoose      = require('mongoose'),
news_mongo    = mongoose.model('news'),
dateTime      = require('../helpers/dateTime');

module.exports = {
	// 获取所有新闻
	getNews(type, callback) {
		news_mongo.find({type})
		.sort({top: -1, createTime: -1})
		.exec((err, news) => {
			console.log(news)
			callback(news)
		})
	},
	Insert(news) {
		return new Promise((resolve, reject) => {
			news.article = news.article.map(v => {
				v.context = v.context.replace(/..\//g, "http://admin.skyfortune.sh.cn/");
				return v;
			})
			news_mongo.create(news, (err, doc) => {
				if(err) return reject(err);
				resolve(doc);
			})
        })
	},
	Update(news) {
		return new Promise((resolve, reject) => {
			const _id = news._id;
			delete news._id;
			news_mongo.update({_id:_id}, news, err => {
				if(err) return reject(err)
				resolve();
			})
        })
	},
	Delete(_id) {
		return new Promise((resolve, reject) => {
			news_mongo.findOne({_id})
			.exec((err, news) => {
				if(news) {
					news.remove(err => {
						if(err) return reject(err);
						resolve();
					})
				} else return reject();
				
			})
		})
	},
	SelectById(_id) {
		return new Promise((resolve, reject) => {
			news_mongo.findOne({_id}).exec((err,docs) => {
				if (err) return reject(err);
				resolve(docs);
			})
        })
	}
}
