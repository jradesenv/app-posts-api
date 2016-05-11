module.exports = function(builder) {
    builder.addModule(postResource);

    function postResource(router, responseHelper, postService, authMiddleware) {
        //definition
        router.get('/post', authMiddleware, listar);
        router.get('/post/:id', authMiddleware, buscar);
        router.post('/post', authMiddleware, criar);

        //implementation
        function listar(req, res) {
            postService.listar(function(err, posts) {
                responseHelper.isSuccessful(err, res, function() {
                    res.send({posts: posts});
                });
            });
        }
        
        function buscar(req, res) {
            postService.buscar(req.params.id, function(err, post) {
                responseHelper.isSuccessful(err, res, function() {
                    res.send({post: post});
                });
            });
        }
        
        function criar(req, res) {
            postService.criar(req.session, req.body, function(err, id) {
                responseHelper.isSuccessful(err, res, function() {
                    res.send({id: id});
                });
            });
        }
    }
};
