module.exports = function(builder) {
    builder.addModule(constantsHelper);

    function constantsHelper() {
        //definition
        var helper = this;
        helper.port = process.env.PORT ? process.env.PORT : 3000;
        helper.apiSecret = "SegredoDaMinhaApi";
        
        helper.appDb = {
            host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
            user: process.env.DB_USER ? process.env.DB_USER : 'root',
            password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'ntco4321',
            database: process.env.DB_DATABASE ? process.env.DB_DATABASE : 'app_posts',
            port: process.env.DB_PORT ? process.env.DB_PORT : 5432
        };
        
        console.log(helper);
        
        helper.errorCodes = {
            invalidUserAndPass: 1,
            invalidToken: 2,
            userAlreadyExists: 3,
            missingMandatoryField: 4
        };

        return helper;
    }
};
