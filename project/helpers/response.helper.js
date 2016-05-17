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
            var errorStatus = _getErrorStatus(err);
            res.status(errorStatus || 500).send({
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
        
        function _getErrorStatus(err) {
            var errorStatus = 500
            if(typeof (err) !== "string"){
                if(err.status) {
                    errorStatus = err.status;
                }
            }
            return errorStatus;
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