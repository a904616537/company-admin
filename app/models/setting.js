var mongoose   = require('mongoose'),
Schema         = mongoose.Schema,
setting_Schema = new Schema({
	key   : {type:String, default: ''},
	value : {type:String, default: ''},
	lang  : {type:String, default: 'zh'},
	type  : {type:String, default: 'skyfortune'}
});

setting_Schema.virtual('date').get(() => {
	this._id.getTimestamp();
});

setting_Schema.statics = {
	findById(_id, callback) {
		this.findOne({_id}, callback);
	},
	get(key, type, callback) {
		this.findOne({key, type}, callback);
	}
}

mongoose.model('setting', setting_Schema, 'setting');
