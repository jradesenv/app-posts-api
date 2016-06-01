// var cluster = require('cluster'),
// numCPUs = require('os').cpus().length;

// if (cluster.isMaster) {
//     console.log("numCPUs: ", numCPUs);
//     for (var i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }
  
//     cluster.on('exit', function (worker) {
//         console.log('Worker %d morreu', worker.id);
//         cluster.fork();
//     });

// } else {

    // console.log("cluster sendo construido: ", cluster.worker.id);
    var express = require('express'),
        app = express(),
        cors = require('cors'),
        bodyParser = require('body-parser'),
        path = require('path'),
        builder = require('dibuilder'),
        router = express.Router(),
        multer = require('multer'),
        http = require('http')

    //adiciona modulos já instanciados/configurados
    builder.addInstance('express', express);
    builder.addInstance('path', path);
    builder.addInstance('router', router);
    builder.addInstance('app', app);
    builder.addInstance('upload', multer({ dest: path.join(__dirname, 'temp/multer') }));
    builder.addInstance("docs", require("express-mongoose-docs"));

    //indica ao builder aonde procurar por novos modulos
    builder.loadModules(path.join(__dirname, './helpers'));
    builder.loadModules(path.join(__dirname, './domain'));
    builder.loadModules(path.join(__dirname, './resources'));
    builder.loadModules(path.join(__dirname, './middlewares'));
    builder.loadModules(path.join(__dirname, './config'));

    //constroi os modulos injetando as dependencias
    builder.build(function(serverConfig) {
        //inicia o servidor
        serverConfig.start(function() {});
    });  
//}