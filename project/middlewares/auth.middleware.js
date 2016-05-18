module.exports = function (builder) {
    builder.addModule(authMiddleware);

    function authMiddleware(jsonwebtoken, constantsHelper, usuarioService, responseHelper) {
        return function authValidate (req, res, next) {
            var token = req.headers['api-token'];
            
            jsonwebtoken.verify(token, constantsHelper.apiSecret, function (err, decoded) {
                if (err) {
                    return responseHelper.sendGenericError({status: 401, code: constantsHelper.errorCodes.invalidToken}, res);
                } else {
                    req.session = decoded;
                    usuarioService.validarCredenciais(req.session.login, req.session.senha, function(err, usuario) {
                        if (!err && usuario) {
                            next();
                        } else {
                            return responseHelper.sendGenericError({status: 401, code: constantsHelper.errorCodes.invalidToken}, res);
                        }
                    }, true);
                }
            });                
        }
    }
};