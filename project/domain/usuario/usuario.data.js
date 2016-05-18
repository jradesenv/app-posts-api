module.exports = function(builder) {
    builder.addModule(UsuarioData);

    function UsuarioData(UsuarioModel, knex) {
        //definition
        var model = this;
        model.list = list;
        model.getById = getById;
        model.getByLogin = getByLogin;
        model.create = create;
        model.update = update;
        return model;

        // implementation
        function list(callback) {
            _getCommonQuery()
                .then(function(usuarios) {
                    for (var i = 0, len = usuarios.length; i < len; i++) {
                        delete usuarios[i].senha;
                    }
                    callback(null, usuarios);
                })
                .catch(function(err) {
                    callback(err);
                })
        }
        
        function create(usuario, callback) {
            var usuarioModel = new UsuarioModel(usuario);
            delete usuarioModel.id;
            
            var query = knex.insert(usuarioModel)
                .into('usuario')
                .returning("id");
                
            query.then(function (ids) {
                callback(null, ids[0]);
            })
            .catch(function (err) {
                callback(err);
            }); 
        }
        
        function update(usuario, callback) {
            var usuarioModel = new UsuarioModel(usuario);
            delete usuarioModel.id;
            
            var query = knex("usuario")
                .update(usuarioModel)
                .where({id: usuario.id});
                
            query.then(function () {
                callback(null);
            })
            .catch(function (err) {
                callback(err);
            }); 
        }
        
        function getByLogin(login, callback, withSenha) {
            var query = _getCommonQuery();
            if(withSenha) query.select("usuario.senha");
            
            query.where('login', '=', login)
                .then(function(usuario) {
                    callback(null, usuario[0]);
                })
                .catch(function(err) {
                    callback(err);
                });
        }
        
        function getById(id, callback, withSenha) {
            var query = _getCommonQuery();
            if(withSenha) query.select("usuario.senha");
            
            query.where('id', '=', id)
                .then(function(usuario) {
                    callback(null, usuario[0]);
                })
                .catch(function(err) {
                    callback(err);
                });
        }
        
        function _getCommonQuery() {
            return knex("usuario")
                .select(["usuario.id", "usuario.nome", "usuario.login"]);
        }
    }
};