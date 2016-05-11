module.exports = function (builder) {
    builder.addModule(databaseConfig);
    builder.executeFunction(init);

    function init(knex, constantsHelper, path, fs) {
        var dbConfig = {
            client: 'mysql',
            connection: {
                host: constantsHelper.appDb.host,
                user: constantsHelper.appDb.user,
                password: constantsHelper.appDb.password,
                database: constantsHelper.appDb.database,
                charset: 'utf8'
            }
        };

        var db = knex(dbConfig);
        builder.addInstance("knex", db);
    }

    function databaseConfig() {
        var config = this;
        return config;
    }
}