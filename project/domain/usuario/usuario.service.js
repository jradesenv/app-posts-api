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
                return callback("'login' é obrigatório.");
            }
            if(!usuario.senha) {
                return callback("'senha' é obrigatório.");
            }
            if(!usuario.nome) {
                return callback("'nome' é obrigatório.");
            }
            UsuarioData.getByLogin(usuario.login, function(err, old) {
                if (err) {
                    return callback(err);
                }
                if (old) {
                    return callback("'login' já existente.")
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
                        callback({status: 401, message: "Usuário e/ou senha inválidos."});
                    } else {
                        callback(null, usuario);
                    }
                } else {
                    callback({status: 401, message: "Usuário e/ou senha inválidos."});
                }
            }, true);
        }

        function efetuarLogin(usuario, callback) {
            try {
                if(!usuario) {
                    return callback("usuario está vazio.");
                }
                if(!usuario.login) {
                    return callback("'login' é obrigatório.");
                }
                if(!usuario.senha) {
                    return callback("'senha' é obrigatório.");
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
                callback("Erro ao efetuar login.");
            }
        }

        function _getToken(usuario, callback) {
            jsonwebtoken.sign(usuario, constantsHelper.apiSecret, {}, function(err, token) {
                callback(err, token);
            });
        }
    }
};
