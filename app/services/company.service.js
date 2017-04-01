const config  = require('../../setting/config'),
mongoose      = require('mongoose'),
company_mongo = mongoose.model('company'),
dateTime      = require('../helpers/dateTime');

module.exports = {
	// 获取所有公司信息
	getCompany(type, pid, callback) {
		company_mongo.find({type, pid})
		.sort('-createTime')
		.exec((err, company) => {
			console.log(company)
			callback(company)
		})
	},
	Insert(company) {
		return new Promise((resolve, reject) => {
			company_mongo.create(company, (err, doc) => {
				if(err) return reject(err);
				resolve(doc);
			})
        })
	},
	Update(company) {
		return new Promise((resolve, reject) => {
			const _id = company._id;
			delete company._id;
			company_mongo.update({_id}, company, err => {
				if(err) return reject(err)
				resolve();
			})
        })
	},
	Delete(_id) {
		return new Promise((resolve, reject) => {
			company_mongo.findOne({_id})
			.exec((err, company) => {
				console.log('company', company)
				if(company) {
					company.remove(err => {
						if(err) return reject(err);
						resolve();
					})
				} else return reject();
				
			})
		})
	},
	SelectById(_id) {
		return new Promise((resolve, reject) => {
			company_mongo.findOne({_id})
			.populate('company')
			.exec((err,docs) => {
				if (err) return reject(err);
				console.log(docs)
				resolve(docs);
			})
        })
	}
}
