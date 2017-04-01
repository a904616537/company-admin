const express  = require('express'),
glob           = require('glob'),
logger         = require('morgan'),
cookieParser   = require('cookie-parser'),
bodyParser     = require('body-parser'),
compress       = require('compression'),
methodOverride = require('method-override'),
zlib           = require('zlib'),
ejs            = require('ejs'),
session        = require('express-session'),
mongoStore     = require('connect-mongo')(session);


module.exports = (app, config) => {

    app.engine('html', ejs.__express);
    app.use(express.static(config.root + '/public/'));
    app.set('views', config.root + '/public/');
    app.set('view engine', 'html');

    app.use(logger('dev'));
    app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended : true,
		limit    : 2000000
	}))

    app.use(methodOverride());
    app.use(cookieParser());
    app.use(compress({
		level    : zlib.Z_BEST_COMPRESSION,
		memLevel : 1
    }))

    app.use(session({
		name              : config.cookie.sessionName,
		secret            : config.cookie.secret,
		store             : new mongoStore({url: config.mongo, autoRemove: 'native', ttl: 0.5 * 60 * 60 }),
		saveUninitialized : true,
		resave            : false,
		cookie            : { httpOnly: true, maxAge: 1000 * 3600 * 24 }
    }))

    //登录拦截器
    app.use((req, res, next) => {
        var url = req.originalUrl;
        console.log('拦截器！', url)
        if (url != "/login" && url != "/404" && url != "/error" && url != "/register" && !req.session.admin)
            return res.redirect('/login')
        next();
    })

    controllers = glob.sync(config.root + '/app/controller/*.js');

    controllers.forEach(controller => {
		console.log('Loading Router：', controller);
        require(controller)(app);
    })

    app.use((req, res, next) => {
        var err = new Error('Not Found');
        err.status = 404;
        res.render('404', {
			message : '您访问的页面不存在',
			error   : err,
			title   : '404'
        });
    })

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error  : {},
            title  : 'error'
        });
        
    })
}