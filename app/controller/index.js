'use strict';
var express     = require('express'),
router          = express.Router(),
setting_service = require('../services/setting.service');


router.route('/')
.get((req, res, next) => {
	console.log(1);
    var admin = req.session.admin;
    if(req.query.type) {
    	console.log(2)
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

	const type = req.session.type;
	setting_service.Update(req.body.key, type, req.body.value, req.body.lang, (err, result) => {
		setting_service.getAll(type, (err, setting) => {
    		console.log(setting)
			res.render('info', {type, setting});
		})
	});
})

module.exports = app => {
  app.use('/', router);
};
