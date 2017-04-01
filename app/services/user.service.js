const config = require('../../setting/config'),
mongoose     = require('mongoose'),
user_mongo   = mongoose.model('user'),
encryption   = require('../helpers/encryption'),
dateTime     = require('../helpers/dateTime');

module.exports = {
	// 获取管理员
	getAdmin(callback) {
		user_mongo.find({}, (err, user) => {
			return callback(user)
		})
	},
	// 删除管理员
	delAdmin(_id, callback) {
		user_mongo.findById(_id, user => {
			if(!user) return callback(false);

			user.remove(err => {
				if(err) return callback(false);
				return callback(true);
			})
		})
	},

	// 登陆
	login(model, callback) {
		user_mongo.findOne({
				username: model.username
			}, (err, user) => {
			if(err) return callback(false, null);
			if(user) {
				// 解密
				encryption.decipher(user.password, user.key, pwd => {
					if(pwd == model.password) return callback(true, user)
					return callback(false, null);
				})
			} else return callback(false, null)
		})
	},

	// 注册
	register(user, callback) {

		user_mongo.findOne({username : user.username}, (err, admin) => {
			if(admin) return callback(false);

			encryption.cipher(user.password, (pwd, key) => {
				admin = new user_mongo({
					name     : user.name,
					username : user.username,
					password : pwd,
					key      : key,
				})
				admin.save(err => {
					if(err) return callback(false);
					return callback(true);
				})
			})
		})
	},

	// 修改密码
	editorPassword(model, callback) {
		user_mongo.findOne({
			username: model.username
		}, (err, user) => {
			if(err) return callback(false);

			if (user) {
				encryption.decipher(user.password, user.key, pwd => {
					if(pwd == model.password) {
						encryption.key_cipher(model.new_password, user.key, password => {
							user.password = password;
								user.save(err => {
								if(err) return callback(false, null);

								return callback(true, user);
							})
						})
					} else return callback(false, null);
				})
			} else return callback(false);
		})
	}
}
