'use strict';
const path 	   = require('path'),
	rootPath   = path.normalize(__dirname + '/..'),
	env        = process.env.NODE_ENV || 'production';

console.log('当前环境', env)

const config = {
	//开发者环境配置
	development: {
		root         : rootPath,
		port         : 9011,
		maxOrderTime : 1080,
		app          : {
			name : 'company',
			host : 'http://localhost:9011/images/upload/'
		},
		mongo : 'mongodb://kain:000000@127.0.0.1/company',
		main  : {
			languagePath : rootPath + '/language/'
		},
		cookie : {
			secret      : 'company',
			sessionName : 'session'
		}
	},
	// 线上产品配置
	production : {
		root         : rootPath,
		port         : 9011,
		maxOrderTime : 1080,
		app          : {
			name : 'company',
			host : 'http://admin.skyfortune.sh.cn/images/upload/'
		},
		mongo : 'mongodb://kain:000000@127.0.0.1/company',
		main  : {
			languagePath : rootPath + '/language/'
		},
		cookie : {
			secret      : 'company',
			sessionName : 'session'
		}
	}
}

module.exports = config[env];
