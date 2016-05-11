module.exports = function (builder) {
    builder.addModule(authMiddleware);

    function authMiddleware(jsonwebtoken, constantsHelper, usuarioService, responseHelper) {
        return function authValidate (req, res, next) {
            var token = req.headers['api-token'];
            
            jsonwebtoken.verify(token, constantsHelper.apiSecret, function (err, decoded) {
                if (err) {
                    return responseHelper.sendError(401, 'Token inválido e/ou expirado.', res);
                } else {
                    req.session = decoded;
                    usuarioService.validarCredenciais(req.session.login, req.session.senha, function(err, usuario) {
                        if (!err && usuario) {
                            next();
                        } else {
                            return responseHelper.sendError(401, 'Usuário e/ou senha inválidos.', res);
                        }
                    }, true);
                }
            });                
        }
    }
};