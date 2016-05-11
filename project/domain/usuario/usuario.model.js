module.exports = function (builder) {
    builder.addModule(UsuarioModel);
    function UsuarioModel() {
        //model
        return function (usuario) {
            this.id = usuario.id;
            this.nome = usuario.nome;
            this.login = usuario.login;
            this.senha = usuario.senha;
        }
    }
};