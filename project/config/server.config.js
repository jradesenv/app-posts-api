module.exports = function (builder) {
    builder.addModule(serverConfig);

    function serverConfig(app, middlewareConfig, constantsHelper, routeConfig, fs, path) {
        //definition
        var service = this;
        service.start = start;
        return service;

        //implementation
        function start(callback) {
            var appPort = constantsHelper.port;
            var server = app.listen(appPort, function () {
                globalsInitialize(server, function () {
                    middlewareConfig.config();
                    routeConfig.config();
                    console.log('Server started at port ' + appPort);
                    if (callback)
                        callback(server);
                });
            });
        }

        function globalsInitialize(server, callback) {
            var address = server.address().address;
            if (!address || address === "::") address = "localhost";
            var port = server.address().port;
            global.__rootPath = path.resolve(__dirname.split('config')[0]);
            //global.__clientPath = path.join(global.__rootPath, "client/src");

            callback();
        }
    }
}