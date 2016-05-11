module.exports = function (builder) {
    builder.addModule(PostModel);
    function PostModel() {
        //model
        return function (post) {
            this.id = post.id;
            this.usuarioId = post.usuarioId;
            this.conteudo = post.conteudo;
            if(typeof post.dataCriacao !== "undefined" ) {
                this.dataCriacao = post.dataCriacao;
            }
        }
    }
};