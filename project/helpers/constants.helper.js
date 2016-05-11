module.exports = function(builder) {
    builder.addModule(constantsHelper);

    function constantsHelper() {
        //definition
        var helper = this;
        helper.port = 3000;
        helper.webUrl = "http://localhost:3000/";
        helper.sufixoUrlImagens = "images/";
        helper.pastaImagens = "IMAGE_FOLDER";
        helper.apiSecret = "SegredoDaMinhaApi";

        // helper.appDb = {
        //     host: 'localhost',
        //     user: 'root',
        //     password: 'ntco4321',
        //     database: 'app_posts'
        // };
        
        helper.appDb = {
            host: 'sql5.freemysqlhosting.net',
            user: 'sql5119085',
            password: 'vX4zXdInsS',
            database: 'sql5119085'
        };

        return helper;
    }
};
