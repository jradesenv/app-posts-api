module.exports = function (builder) {
    builder.addModule(responseHelper);

    function responseHelper() {     
        //definition
        var helper = this;
        helper.isSuccessful = isSuccessful;
        helper.sendGenericError = sendGenericError;
        helper.sendError = sendError;
        return helper;
        
        // implementation
        function sendError(status, err, res) {
            var errorMsg = _getErrorMsg(err);
            
            res.status(status).send({
                error: errorMsg
            });
        }
        
        function sendGenericError(err, res) {
            var errorMsg = _getErrorMsg(err);
            
            res.status(500).send({
                error: errorMsg
            });
        }
        
        function _getErrorMsg(err) {
            var errorMsg;
            if(typeof (err) === "string"){
                errorMsg = err;
            } else {
                if(err.message) {
                    errorMsg = err.message;
                } else {
                    errorMsg = JSON.stringify(err);
                }
            }
            return errorMsg;
        }

        function isSuccessful(err, res, callback) {
            if (err) {
                helper.sendGenericError(err, res);
            } else {
                if (callback) callback();
            }
        };
    }
};