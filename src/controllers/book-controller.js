const { BookService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createBook(req, res) {
    try {
        const book = await BookService.createBook({
            title: req.body.title,
            author: req.body.author,
            published_year: req.body.published_year
        });
        SuccessResponse.data = book;
        SuccessResponse.message = "Successfully created a book";
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function getBooks(req, res) {
    try {
        const book = await BookService.getBooks();
        return res
                .status(StatusCodes.OK)
                .json({
                    success: true,
                    message: "Successfully got all books",
                    data: book,
                    error: {}     
                });
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                success: false,
                message: "Something went wrong while getting all books",
                data: {},
                error: error    
            });
    }
}

async function getBook(req, res) {
    try {
        const book = await BookService.getBook(req.params.id);
        SuccessResponse.data = book;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while getting a book";
        ErrorResponse.error = error;
        res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function updateBook(req, res) {
    try {
        const book = await BookService.updateBook(req.params.id, {
            title: req.body.title,
            author: req.body.author,
            published_year: req.body.published_year
        });
        SuccessResponse.data = book;
        SuccessResponse.message = "Successfully updated the book"
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while updating a book";
        ErrorResponse.error = error;
        res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function destroyBook(req, res) {
    try {
        const book = await BookService.destroyBook(req.params.id);
        SuccessResponse.data = book;
        SuccessResponse.message = "Successfully deleted the book"
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while deleting a book";
        ErrorResponse.error = error;
        res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}


module.exports = {
    createBook,
    getBooks,
    getBook,
    updateBook,
    destroyBook,
}