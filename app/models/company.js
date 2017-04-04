'use strict';
var mongoose    = require('mongoose'),
	Schema      = mongoose.Schema,
	article_Scheam = new Schema({
		title    : String,
		subtext  : String,
		context  : String,
		language : {type: String, default: 'zh'}
	}),
	conpany_Schema = new Schema({
		article    : [article_Scheam],
		type       : {type: String, default: 'skyfortune'},
		pid        : {type: Number, default: 0},
		banner     : String,
		imgurl     : [String],
		createTime : {type : Date, default : Date.now}
    });

conpany_Schema.virtual('date').get(() => {
	this._id.getTimestamp();
});

conpany_Schema.statics = {
	findById(id, callback) {
		return this.findOne({_id : id}, (err, company) => callback(company))
	}
}

mongoose.model('company', conpany_Schema, 'company');
