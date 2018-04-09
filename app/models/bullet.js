'use strict';
const mongoose = require('mongoose'),
Schema         = mongoose.Schema,
article_Scheam = new Schema({
	title    : String,
	language : {type: String, default: 'zh'}
}),
bullet_Schema = new Schema({
	file       : {type : String},
	top        : {type : Boolean, default :false },
	article    : [article_Scheam],
	endTime    : {type : String, default : ''},
	createTime : {type : Date, default : Date.now}
});

bullet_Schema.virtual('date').get(() => {
	this._id.getTimestamp();
});

bullet_Schema.statics = {
	findById(id, callback) {
		return this.findOne({_id : id}, (err, bullet) => callback(bullet))
	}
}

mongoose.model('bullet', bullet_Schema, 'bullet');
