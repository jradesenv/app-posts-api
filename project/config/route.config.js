module.exports = function (builder) {
    builder.addModule(routeConfig);

    function routeConfig(express, app, constantsHelper, router, path) {
        //definition
        var service = this;
        service.config = config;
        return service;
		
        //implementation	
        function config() {
            //erros não tratados
            router.use(function (err, req, res, next) {
                res.status(err.statusCode || 500).send(err.message);
            });
            
            app.use(function (error, req, res, next) {
                if (!error) {
                    next();
                } else {
                    res.status(error.statusCode || 500).send(error.message);
                }
            });

            //registrar rotas da api
            app.use('/api', router);
            //expoe imagens
            app.use("/images", express.static(__imagesPath));
            //expoe website
            // app.use("/eventos", express.static(__clientPath));
        }
    }
}