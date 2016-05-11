module.exports = function(builder) {
    builder.addModule(PostData);

    function PostData(PostModel, knex) {
        //definition
        var model = this;
        model.list = list;
        model.create = create;
        model.getById = getById;
        return model;

        // implementation        
        function list(callback) {
            _getCommonQuery()
                .then(function(posts) {
                    callback(null, posts);
                })
                .catch(function(err) {
                    callback(err);
                })
        }
        
        function getById(id, callback) {
            _getCommonQuery()
                .where('post.id', '=', id)
                .then(function(post) {
                    callback(null, post[0]);
                })
                .catch(function(err) {
                    callback(err);
                });
        }
        
        function create(post, callback) {
            var postModel = new PostModel(post);
            delete postModel.id;
            
            var query = knex.insert(postModel)
                .into('post')
                .returning("id");
                
            query.then(function (ids) {
                callback(null, ids[0]);
            })
            .catch(function (err) {
                callback(err);
            }); 
        }        
        
        function _getCommonQuery() {
            return knex("post")
                .select(["post.id", "post.conteudo", "post.usuarioId", "usuario.nome as usuarioNome"])
                .innerJoin('usuario', 'post.usuarioId', 'usuario.id');
        }
    }
};
