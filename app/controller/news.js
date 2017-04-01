
let express  = require('express'),
router       = express.Router(),
news_service = require('../services/news.service'),
message      = require('../helpers/message');

router.route('/article')
    .get((req, res) => {
        if(req.query._id) {
            news_service.SelectById(req.query._id)
            .then(result => {
                res.render('news_insert', {news : result});
            })
            .catch(err => {
                res.render('news_insert', {news: {}});
            })
        } else res.render('news_insert', {news: {}})
    })
    .put((req, res) => {
        var model = {
            _id     : req.body._id,
            imgurl  : req.body.imgurl,
            top     : req.body.top,
            is_show : req.body.is_show
        },
        articles = [{
            title    : req.body.zh_title,
            desc     : req.body.zh_desc,
            context  : req.body.zh_content,
            language : 'zh'
        },{
            title    : req.body.en_title,
            desc     : req.body.en_desc,
            context  : req.body.en_content,
            language : 'en'
        }],
        msg = message();
        
        model.article = articles;

        news_service.Update(model)
        .then(result => {
            msg.msg    = '编辑新闻成功！';
            msg.status = 1;
            console.log(msg)
            res.send(msg);
        })
        .catch(err => {
            msg.msg    = '编辑新闻失败！';
            console.log(msg)
            res.send(msg);
        })
    })
    .post((req, res) => {
        var model = {
            top     : req.body.top,
            imgurl  : req.body.imgurl,
            type    : req.session.type,
            is_show : req.body.is_show
        },
        articles = [{
			title    : req.body.zh_title,
			context  : req.body.zh_content,
			language : 'zh'
	    },{
			title    : req.body.en_title,
			context  : req.body.en_content,
			language : 'en'
	    }],
        msg = message();

        model.article = articles;

        news_service.Insert(model)
        .then(result => {
			msg.msg    = '添加新闻成功！';
            msg.status = 1;
            res.send(msg);
        })
        .catch(err => {
        	msg.msg    = '添加新闻失败！';
            res.send(msg);
        })
    })
    .delete((req, res) => {
        var _id = req.query._id,
            msg = message();

        news_service.Delete(_id)
        .then(result => {
            msg.msg    = '新闻删除成功！';
            msg.status = 1;
            res.send(msg);
        })
        .catch(err => {
            msg.msg    = '新闻删除失败！';
            res.send(msg);
        })
    })

router.route('/')
.get((req, res) => {
    const type = req.session.type;
    console.log(req.session)
    news_service.getNews(type, result => {
        res.render('news', {news : result})
    })
})

module.exports = app => {
    app.use('/news', router);
}
