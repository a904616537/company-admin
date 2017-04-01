var express     = require('express'),
router          = express.Router(),
setting_service = require('../services/setting.service');


router.route('/')
.get((req, res, next) => {
    var admin = req.session.admin;
    if(req.query.type) {
		const type       = req.query.type;
		req.session.type = type;
		setting_service.getAll(type, (err, setting) => {
			res.render('home', { admin, type, setting});
		})
    } else{
    	setting_service.getAll(req.session.type, (err, setting) => {
			res.render('home', {admin, type : req.session.type, setting});
		})
    }
})
.post((req, res) => {
	const {key, value, lang} = req.body;
	const type = req.session.type;
	setting_service.Update(key, type, value, lang, (err, result) => {
		setting_service.getAll(type, (err, setting) => {
    		console.log(setting)
			res.render('info', {type, setting});
		})
	});
})

module.exports = app => {
  app.use('/', router);
};
