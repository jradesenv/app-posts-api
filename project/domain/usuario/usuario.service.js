module.exports = function(builder) {
    builder.addModule(usuarioService);

    function usuarioService(UsuarioData, constantsHelper, jsonwebtoken, md5) {
        //definition
        var service = this;
        service.listar = listar;
        service.validarCredenciais = validarCredenciais;
        service.efetuarLogin = efetuarLogin;
        service.criar = criar;
        service.buscar = buscar;
        return service;

        // implementation
        function listar(callback) {
            UsuarioData.list(function(err, usuarios) {
                if (err) {
                    return callback(err);
                }
                callback(null, usuarios);
            });
        }
        
        function buscar(id, callback) {
            UsuarioData.getById(id, function(err, usuario) {
                if (err) {
                    return callback(err);
                }
                callback(null, usuario);
            });
        }
        
        function criar(usuario, callback, alreadyMd5) {
            if(!usuario.login) {
                return callback({status: 400, code: constantsHelper.errorCodes.missingMandatoryField, field: "login"});
            }
            if(!usuario.senha) {
                return callback({status: 400, code: constantsHelper.errorCodes.missingMandatoryField, field: "senha"});
            }
            if(!usuario.nome) {
                return callback({status: 400, code: constantsHelper.errorCodes.missingMandatoryField, field: "nome"});
            }
            UsuarioData.getByLogin(usuario.login, function(err, old) {
                if (err) {
                    return callback(err);
                }
                if (old) {
                    return callback({status: 409, code: constantsHelper.errorCodes.userAlreadyExists});
                } else {
                    usuario.senha = alreadyMd5 ? usuario.senha : md5(usuario.senha);
                    UsuarioData.create(usuario, function(err, id) {
                        if (err) {
                            return callback(err);
                        }
                        callback(null, id);
                    });
                }
            });            
        }

        function validarCredenciais(login, senha, callback, alreadyMd5) {
            UsuarioData.getByLogin(login, function(err, usuario) {
                if (err) {
                    return callback(err);
                }
                if (usuario) {
                    senha = alreadyMd5 ? senha : md5(senha);
                    if (senha !== usuario.senha) {
                        callback({status: 401, code: constantsHelper.errorCodes.invalidUserAndPass});
                    } else {
                        callback(null, usuario);
                    }
                } else {
                    callback({status: 401, code: constantsHelper.errorCodes.invalidUserAndPass});
                }
            }, true);
        }

        function efetuarLogin(usuario, callback) {
            try {
                if(!(usuario && usuario.login)) {
                    return callback({status: 400, code: constantsHelper.errorCodes.missingMandatoryField, field: "login"});
                }
                if(!usuario.senha) {
                    return callback({status: 400, code: constantsHelper.errorCodes.missingMandatoryField, field: "senha"});
                }
                validarCredenciais(usuario.login, usuario.senha, function(err, usuario) {
                    if (err) {
                        return callback(err);
                    }
                    _getToken(usuario, function(err, token) {
                        if (err) {
                            return callback(err);
                        }
                        delete usuario.senha;
                        callback(null, usuario, token);
                    });
                });
            } catch (ex) {
                console.error(ex);
                callback(ex);
            }
        }

        function _getToken(usuario, callback) {
            jsonwebtoken.sign(usuario, constantsHelper.apiSecret, {}, function(err, token) {
                callback(err, token);
            });
        }
    }
};
