'use strict';
var mongoose    = require('mongoose'),
	Schema      = mongoose.Schema,
	banner_Schema = new Schema({
		title      : {type:String, default: ''},
		type       : {type: String, default: 'skyfortune'},
		imgurl     : String,
		order      : {type : Number, default : 0 },
		createTime : {type : Date, default : Date.now}
    });

banner_Schema.virtual('date').get(() => {
	this._id.getTimestamp();
});

banner_Schema.statics = {
	findById(id, callback) {
		return this.findOne({_id : id}, (err, banner) => callback(banner))
	}
}

mongoose.model('banner', banner_Schema, 'banner');
