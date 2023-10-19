const { BookRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");


const bookRepository = new BookRepository();

async function createBook(data) {
    try {
        const book = await bookRepository.create(data);
        return book;
    } catch (error) {
        if(error.name == "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new book", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getBooks() {
    try {
        const book = await bookRepository.getAll();
        return book;
    } catch (error) {
        Logger.error("Something went wrong in Book Service: getBooks");
        throw error;
    }
}

async function getBook(id) {
    try {
        const book = await bookRepository.get(id);
        return book;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The book you requested is not present", error.statusCode);
        }
        throw new AppError("Cannot fetch data of the book", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateBook(id, data) {
    try {
        const book = await bookRepository.update(id, data);
        return book;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The book you requested is not present", error.statusCode);
        }
        throw new AppError("Cannot update book", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyBook(id) {
    try {
        const book = await bookRepository.destroy(id);
        return book;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The book you requested to delete is not present", error.statusCode);
        }
        throw new AppError("Cannot delete book", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

 
module.exports = {
    createBook,
    getBooks,
    getBook,
    updateBook,
    destroyBook,
}