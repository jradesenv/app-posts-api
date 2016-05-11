module.exports = function (builder) {
    builder.addModule(thumbnailHelper);

    function thumbnailHelper(easyimage, constantsHelper, path) {        
        //definition
        var helper = this;
        helper.makeThumbnail = makeThumbnail;
        return helper;
        
        // implementation
        function makeThumbnail(imageUrl, callback) {
            try {
                var fileName = path.basename(imageUrl);
                var thumbnailUrl = path.join(__uploadsPath, '/thumb_' + fileName);
                easyimage.resize({
                    src: imageUrl, dst: thumbnailUrl,
                    width: 150, height: 150
                }).then(
                    function (image) {
                        callback(null, thumbnailUrl);
                    },
                    function (err) {
                        callback(err);
                    });
            } catch (ex) {
                callback(ex);
            }
        };
    }
};