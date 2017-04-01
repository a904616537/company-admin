let express     = require('express'),
router          = express.Router(),
company_service = require('../services/company.service'),
message         = require('../helpers/message');

router.route('/article')
    .get((req, res) => {
        const type = req.session.type;
        const pid  = req.query.pid;
        if(req.query._id) {
            company_service.SelectById(req.query._id)
            .then(result => {
                res.render('company_editor', {company : result, pid});
            })
            .catch(err => {
                res.render('company_editor', {company: {}, pid});
            })
        } else res.render('company_editor', {company: {}, pid});
    })
    .put((req, res) => {
        var model = {
            _id : req.body._id
        },
        articles = [{
            title    : req.body.zh_title,
            subtext  : req.body.zh_subtext,
            context  : req.body.zh_content,
            language : 'zh'
        },{
            title    : req.body.en_title,
            subtext  : req.body.en_subtext,
            context  : req.body.en_content,
            language : 'en'
        }],
        msg = message();
        
        if(req.body.banner) model.banner = req.body.banner;
        if(req.body.imgurl) model.imgurl = req.body.imgurl;

        model.article = articles;

        company_service.Update(model)
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
        console.log(req.query);
        var model = {
            banner : req.body.banner,
            imgurl : req.body.imgurl,
            pid    : req.query.pid,
            type   : req.session.type || 'skyfortune'
        },
        articles = [{
            title    : req.body.zh_title,
            subtext  : req.body.zh_subtext,
            context  : req.body.zh_content,
            language : 'zh'
	    },{
            title    : req.body.en_title,
            subtext  : req.body.en_subtext,
            context  : req.body.en_content,
            language : 'en'
	    }],
        msg = message();

        model.article = articles;

        company_service.Insert(model)
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

        company_service.Delete(_id)
        .then(result => {
            msg.msg    = '删除成功！';
            msg.status = 1;
            res.send(msg);
        })
        .catch(err => {
            msg.msg = '删除失败！';
            res.send(msg);
        })
    })

router.route('/')
.get((req, res) => {
    const type = req.session.type;
    const pid = req.query.pid;
    company_service.getCompany(type, pid, result => {
        res.render('company', {companys : result, pid})
    })
})


module.exports = app => {
    app.use('/company', router);
}
