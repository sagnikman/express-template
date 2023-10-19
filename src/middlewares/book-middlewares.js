const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
    if(!req.body.title) {
        ErrorResponse.message = "Something went wrong while creating a book";
        ErrorResponse.error = new AppError(
                                ["title not found in the correct form in the request body"],
                                StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}    

module.exports = {
    validateCreateRequest
}