const ERROR = {
    GENERAL_ERROR: {message: "Internal server error. Please try again.", status: 500},
    BAD_REQUEST: {message: "A bad request was sent.", status: 400},
    INVALID_BOARD: {message: "Invalid board", status: 405}
}

class ApplicationError extends Error {

    constructor(errorObj) {
        var {message, status} = errorObj.message;
        super(message)
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.status = status;
        this.message = message;
    }

    addErrorObject(obj) {
        obj.status = this.status;
        obj.message = this.message;
        return obj;
    }

    getErrorObject() {
        return {status: this.status, message: this.message};
    }

    getStatus() {
        return this.status;
    }

    getMessage() {
        return this.message;
    }

}

export { ERROR };
export default ApplicationError;