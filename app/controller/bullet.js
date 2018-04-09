
'use strict';
let express    = require('express'),
router         = express.Router(),
bullet_service = require('../services/bullet.service'),
message        = require('../helpers/message'),
config         = require('../../setting/config'),
cacheFolder    = config.root + '/public/images/upload/';

router.route('/list')
.get((req, res) => {
    bullet_service.getBullet(result => {
    	console.log('result', result)
        res.render('bullet', {data : result})
    })
})

router.route('/download/:_id')
.get((req, res) => {
    const _id = req.params._id;
    bullet_service.SelectById(_id)
    .then(result => {
        let path = result.file.split("/")[5];
        const filepath = cacheFolder + path;
        const article = result.article.find(val => val.language == 'zh')
        res.download(filepath, article.title + '.xlsx');
    })
    .catch(err => {
        res.send('error')
    })
})

router.route('/')
.get((req, res) => {
    
    if(req.query._id) {
        bullet_service.SelectById(req.query._id)
        .then(result => {
            res.render('bullet_edit', {data : result});
        })
        .catch(err => {
            res.render('bullet_edit', {data: {}});
        })
    } else res.render('bullet_edit', {data: {}})
})
.put((req, res) => {
    var model = {
		_id     : req.body._id,
		top     : req.body.top,
		endTime : req.body.endTime
    },
    articles = [{
        title    : req.body.zh_title,
        language : 'zh'
    },{
        title    : req.body.en_title,
        language : 'en'
    }],
    msg = message();
    
    if(req.body.file) model.file = req.body.file

    model.article = articles;

    bullet_service.Update(model)
    .then(result => {
        msg.msg    = '编辑成功！';
        msg.status = 1;
        console.log(msg)
        res.send(msg);
    })
    .catch(err => {
        msg.msg    = '编辑失败！';
        console.log(msg)
        res.send(msg);
    })
})
.post((req, res) => {
    var model = {
		top     : req.body.top,
		file    : req.body.file,
		endTime : req.body.endTime
    },
    articles = [{
        title    : req.body.zh_title,
        language : 'zh'
    },{
        title    : req.body.en_title,
        language : 'en'
    }],
    msg = message();

    model.article = articles;

    bullet_service.Insert(model)
    .then(result => {
		msg.msg    = '添加成功！';
        msg.status = 1;
        res.send(msg);
    })
    .catch(err => {
    	msg.msg    = '添加失败！';
        res.send(msg);
    })
})
.delete((req, res) => {
    var _id = req.query._id,
        msg = message();

    bullet_service.Delete(_id)
    .then(result => {
        msg.msg    = '删除成功！';
        msg.status = 1;
        res.send(msg);
    })
    .catch(err => {
        msg.msg    = '删除失败！';
        res.send(msg);
    })
})

module.exports = app => {
    app.use('/bullet', router);
}
