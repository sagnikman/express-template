const CrudRepository = require("./crud-repository");
const { Book } = require("../models");


class BookRepository extends CrudRepository {
    constructor() {
        super(Book);
    }

}

module.exports = BookRepository;