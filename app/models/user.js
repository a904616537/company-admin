var mongoose    = require('mongoose'),
	Schema      = mongoose.Schema,
	dateTime    = require('../helpers/dateTime'),
	user_Schema = new Schema({
		name       : String,
		username   : String,
		password   : String,
		key        : String,
		createTime : {type : Date, default : Date.now }
    });

user_Schema.virtual('date').get(() => {
  this._id.getTimestamp();
});

user_Schema.statics = {
	findById(id, callback) {
		return this.findOne({_id : id}, (err, user) => callback(user))
	}
}

mongoose.model('user', user_Schema, 'user');
