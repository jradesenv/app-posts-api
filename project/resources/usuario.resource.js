module.exports = function(builder) {
    builder.addModule(usuarioResource);

    function usuarioResource(router, responseHelper, usuarioService, authMiddleware) {
        //definition
        router.post('/login', efetuarLogin);
        router.post('/usuario', criar); //sem autenticação pra facilitar
        router.put('/usuario/:id', authMiddleware, alterar); //sem autenticação pra facilitar
        router.delete('/usuario/:id', authMiddleware, excluir); //sem autenticação pra facilitar
        router.get('/usuario', authMiddleware, listar);
        router.get('/usuario/:id', authMiddleware, buscar);

        //implementation
        function listar(req, res) {
            usuarioService.listar(function(err, usuarios) {
                responseHelper.isSuccessful(err, res, function() {
                    res.send({usuarios: usuarios});
                });
            });
        }
        
        function buscar(req, res) {
            usuarioService.buscar(req.params.id, function(err, usuario) {
                responseHelper.isSuccessful(err, res, function() {
                    res.send({usuario: usuario});
                });
            });
        }
        
        function criar(req, res) {
            usuarioService.criar(req.body, function(err, id) {
                responseHelper.isSuccessful(err, res, function() {
                    res.send({id: id});
                });
            });
        }
        
        function excluir(req, res) {
            usuarioService.excluir(req.params.id, function(err) {
                responseHelper.isSuccessful(err, res, function() {
                    res.send();
                });
            });
        }
        
        function alterar(req, res) {
            usuarioService.alterar(req.params.id, req.body, function(err, id) {
                responseHelper.isSuccessful(err, res, function() {
                    res.send({id: id});
                });
            });
        }

        function efetuarLogin(req, res) {
            usuarioService.efetuarLogin(req.body, function(err, usuario, token) {
                responseHelper.isSuccessful(err, res, function() {
                    var resposta = {
                        usuario: usuario,
                        token: token
                    };
                    res.send(resposta);
                })
            });
        }
    }
};
