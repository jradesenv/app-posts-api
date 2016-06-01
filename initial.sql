CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(500) NOT NULL,
  `login` varchar(100) NOT NULL,
  `senha` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuarioId` int(11) NOT NULL,
  `conteudo` varchar(5000) NOT NULL,
  `dataCriacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_post_usuario_idx` (`usuarioId`),
  CONSTRAINT `fk_post_usuario` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;


GRANT SELECT, DELETE, INSERT, UPDATE ON teste.usuario TO 'myuser'@'localhost';
GRANT SELECT, DELETE, INSERT, UPDATE ON teste.post TO 'myuser'@'localhost';
flush privileges;