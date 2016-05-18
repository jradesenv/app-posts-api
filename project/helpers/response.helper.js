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
            var errorCode = _getErrorCode(err);
            var errorField = _getErrorFields(err);
            
            var resObj = {};
            
            if(errorMsg) {
                resObj.message = errorMsg;
            }
            
            if(errorCode) {
                resObj.code = errorCode;
            }
            
            if(errorField) {
                resObj.fields = errorField;
            }
            
            res.status(errorStatus)
                .send(resObj);
        }
        
        function _getErrorFields(err) {
            var errorField = null
            if(typeof (err) !== "string"){
                if(err.fields) {
                    errorField = err.fields;
                }
            }
            return errorField;
        }
        
        function _getErrorCode(err) {
            var errorCode = null
            if(typeof (err) !== "string"){
                if(err.code) {
                    errorCode = err.code;
                }
            }
            return errorCode;
        }
        
        function _getErrorMsg(err) {
            var errorMsg;
            if(typeof (err) === "string"){
                errorMsg = err;
            } else {
                if(err.message) {
                    errorMsg = err.message;
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