module.exports = function(builder) {
    builder.addModule(uploadHelper);

    function uploadHelper(constantsHelper, easyimage, fs, path) {
        //definition
        var service = this;
        service.salvaImagem = salvaImagem;
        service.salvarArquivo = salvarArquivo;
        service.salvarImageBase64 = salvarImageBase64;
        service.salvarMultiplasImagens = salvarMultiplasImagens;
        return service;

        // implementation  

        function salvarMultiplasImagens(files, arrURLS, callback) {

            if (!arrURLS) {
                arrURLS = [];
            }

            if (files.length == 0) {
                callback(null, arrURLS);
            }

            var fileExt = "." + files[0].originalname.split('.').pop();
            var fileName = Date.now() + fileExt;
            var destinationPath = path.join(__imagesPath, fileName);
            var returnPath = __webUrl + constantsHelper.sufixoUrlImagens + fileName;


            fs.readFile(files[0].path, function(err, data) {
                if (err) {
                    callback(err);
                }
                else {
                    fs.writeFile(destinationPath, data, 'binary', function(err) {
                        resize(destinationPath, function(err) {
                            if (err) { 
                                callback(err)
                            } else {
                                excluirOriginal(files[0].path);
                                arrURLS.push(returnPath);
                                files.shift();
                                salvarMultiplasImagens(files, arrURLS, callback);
                            }
                        });
                    });
                }
            });
        }

        function salvarArquivo(file, callback) {
            var fileExt = "." + file.originalname.split('.').pop();
            var fileName = Date.now() + fileExt;
            var destinationPath = constantsHelper.pastaArquivos + '/' + fileName;
            var returnPath = __webUrl + constantsHelper.sufixoUrlArquivos + fileName;

            fs.readFile(file.path, function(err, data) {
                if (err) {
                    callback(err);
                }
                else {
                    fs.writeFile(destinationPath, data, 'binary', function(err) {
                        excluirOriginal(file.path);
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, returnPath);
                        }
                    });
                }
            });
        }

        function salvaImagem(file, callback) {

            var fileExt = "." + file.originalname.split('.').pop();
            var fileName = Date.now() + fileExt;
            var destinationPath = path.join(__imagesPath, fileName);
            var returnPath = __webUrl + constantsHelper.sufixoUrlImagens + fileName;


            fs.readFile(file.path, function(err, data) {
                if (err) {
                    callback(err);
                }
                else {
                    fs.writeFile(destinationPath, data, 'binary', function(err) {
                        resize(destinationPath, function(err) {
                            if (err) {
                                callback(err)
                            } else {
                                excluirOriginal(file.path);
                                callback(null, returnPath);
                            }
                        });
                    });
                }
            });
        }

        function excluirOriginal(oiginalPath) {
            fs.unlink(oiginalPath, function() {

            });
        }

        function salvarImageBase64(base64, callback) {
            var base64Data = base64.replace("data:image/jpeg;base64,", "");
            var fileName = Date.now();
            var destinationPath = __imagesPath + '/' + fileName;
            var returnPath = __webUrl + constantsHelper.sufixoUrlImagens + fileName;

            return fs.writeFile(destinationPath + ".jpg", new Buffer(base64Data, "base64"), function(err) {
                resize(destinationPath, function(err) {
                    if (err) {
                        callback(err)
                    } else {
                        excluirOriginal(file.path);
                        callback(null, returnPath);
                    }
                });
            });
        }

        function resize(destinationPath, callback) {
            easyimage.resize({
                src: destinationPath, dst: destinationPath,
                width: 300,
                quality: 85
            }).then(
                function(image) {
                    console.log(image);
                    console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
                    callback(null);
                },
                function(err) {
                    callback(err);
                    console.log(err);
                });
        }

    }
};
