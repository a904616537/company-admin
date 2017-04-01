const express = require('express'),
config        = require('./setting/config'),
glob          = require('glob');

// Mongodb 预加载
models = glob.sync(config.root + '/app/models/*.js')
models.forEach(model => {
    console.log('Loading Mongodb model：' + model);
    require(model);
})

app = express();

// 应用程序加载
require('./setting/express')(app, config);

// 应用程序启动 config.mongo.db
require('./app/services/mongodb.client');

app.listen(config.port, () => console.log('Express server listening on port ' + config.port))