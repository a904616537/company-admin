var mongoose    = require('mongoose'),
	Schema      = mongoose.Schema,
	news_Schema = new Schema({
		news_id  : { type: Schema.Types.ObjectId, ref: 'news'},
		type     : { type: String, default: 'skyfortune'},
		title    : String,
		context  : String,
		language : { type: String, default: 'zh'}
    });

news_Schema.virtual('date').get(() => {
	this._id.getTimestamp();
});

news_Schema.statics = {
	findById(id, callback) {
		return this.findOne({_id : id}, (err, article) => callback(article))
	}
}

mongoose.model('article', news_Schema, 'article');
