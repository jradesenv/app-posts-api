module.exports = function(builder) {
    builder.addModule(postService);

    function postService(PostData) {
        //definition
        var service = this;
        service.listar = listar;
        service.buscar = buscar;
        service.criar = criar;
        return service;

        // implementation
        function listar(callback) {
            PostData.list(function(err, posts) {
                if (err) {
                    return callback(err);
                }
                callback(null, posts);
            });
        }
        
        function buscar(id, callback) {
            PostData.getById(id, function(err, post) {
                if (err) {
                    return callback(err);
                }
                callback(null, post);
            });
        }
        
        function criar(session, post, callback) {
            if(!(post && post.conteudo)) {
                return callback({status: 400, code: constantsHelper.errorCodes.missingMandatoryField, field: "conteudo"});
            }
            
            post.usuarioId = session.id;
            
            PostData.create(post, function(err, id) {
                if (err) {
                    return callback(err);
                }
                callback(null, id);
            });
        }
    }
};
