var mongoose    = require('mongoose'),
	Schema      = mongoose.Schema,
	article_Scheam = new Schema({
		title    : String,
		desc     : String,
		context  : String,
		language : {type: String, default: 'zh'}
	}),
	news_Schema = new Schema({
		imgurl     : {type : String},
		type       : {type : String, default: 'skyfortune'},
		top        : {type : Boolean, default :false },
		is_show    : {type : Boolean, default :true },
		article    : [article_Scheam],
		createTime : {type : Date, default : Date.now}
    });

news_Schema.virtual('date').get(() => {
	this._id.getTimestamp();
});

news_Schema.statics = {
	findById(id, callback) {
		return this.findOne({_id : id}, (err, news) => callback(news))
	}
}

mongoose.model('news', news_Schema, 'news');
