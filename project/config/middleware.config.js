module.exports = function (builder) {
    builder.addModule(middlewareConfig);

	function middlewareConfig(app, cors, bodyParser, express, compression, docs) {
		//definition
		var service = this;
		service.config = config;
		return service;
		
		//implementation	
		function config() {
            app.use(compression({level: 9}));
			app.use(cors());
			app.use(bodyParser.json({limit: '1gb'}));
			app.use(bodyParser.urlencoded({
				extended: true,
                limit: '1gb'
			}));
			docs(app);
		}
	}
}