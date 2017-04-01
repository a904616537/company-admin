let express    = require('express'),
router         = express.Router(),
banner_service = require('../services/banner.service'),
message        = require('../helpers/message');

router.route('/')
.get((req, res) => {
    const type = req.session.type;
    console.log('type', type)
    banner_service.Get(type, result => {
        res.render('banner', {banner : result})
    })
})
.put((req, res) => {
	let banner = {
		_id    : req.body._id,
		title  : req.body.title,
		order  : req.body.order,
		imgurl : req.body.imgurl
	},
	msg = message();

	banner_service.Update(banner)
	.then(() => {
        msg.msg    = '编辑成功！';
        msg.status = 1;
        res.send(msg);
    })
    .catch(err => {
    	msg.msg    = '编辑失败！';
        console.log(msg)
        res.send(msg);
    })
})
.post((req, res) => {
	var banner = {
        title  : req.body.title,
        type   : req.session.type,
        order  : req.body.order,
        imgurl : req.body.imgurl
    },
    msg = message();

    banner_service.Insert(banner)
	.then(() => {
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

    banner_service.Delete(_id)
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

router.route('/:id')
.get((req, res) => {
	const _id = req.params.id;
    banner_service.SelectById(_id)
    .then(banner => {
        res.send(banner)
    })
})

module.exports = app => {
    app.use('/banner', router);
}
