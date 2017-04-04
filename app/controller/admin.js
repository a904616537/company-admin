'use strict';
let express   = require('express'),
router        = express.Router(),
admin_service = require('../services/user.service'),
message       = require('../helpers/message');

router.route('/login')
    .get((req, res) => {
        var admin = req.session.admin;
        if(admin) return res.redirect('/');
        res.render('login');
    })
    .post((req, res) => {
        var user = {
            username : req.body.username,
            password : req.body.password
        },
        msg = message();

        admin_service.login(user, (bo, admin) => {
            if(bo) {
                msg.msg           = '登录成功！';
                msg.status        = 1;
                req.session.type  = 'skyfortune';
                req.session.admin = admin;
            } else msg.msg = '登录失败！';
            res.send(msg);
        });
    });

router.route('/logout')
    .get((req, res) => {
        req.session.admin = null;
        res.redirect('/login');
    });

router.route('/register')
    .get((req, res) => {
        res.render('register');
    })
    .post((req, res) => {
        var model = {
            name     : req.body.name,
            username : req.body.username,
            password : req.body.password
        },
        msg = message();

        admin_service.register(model, bo => {
            if(bo) {
                msg.msg    = '注册成功！';
                msg.status = 1;
            } else msg.msg = '注册失败！';

            res.send(msg);
        });
    });

router.route('/editor/password')
    .get((req, res) => {
        var admin = req.session.admin;
        res.render('password_editor', admin);
    })
    .post((req, res) => {
        var model = {
            username    : req.body.username,
            password    : req.body.password,
            new_password: req.body.new_password
        },
        msg = message();

        admin_service.editorPassword(model, (status, admin) => {
            if(status) {
                msg.msg    = '密码更改成功！';
                msg.status = 1;
            } else msg.msg = '密码更改失败！';
            res.send(msg);
        })
    })
// 获取管理员·
router.route('/admin')
    .get((req, res) => {
        admin_service.getAdmin(admins => {
            res.render('admins', {admins: admins});
        })
    });

// 移除管理员
router.route('/admin/:id')
    .delete((req, res) => {
        var id  = req.params.id,
        msg = message();

        admin_service.delAdmin(id, status => {
            if(status) {
                msg.status = 1;
                msg.msg    = '删除成功！';
            } else msg.msg = '操作失败！';
            res.send(msg);
        })
    });

module.exports = app => {
    app.use('/', router);
}
