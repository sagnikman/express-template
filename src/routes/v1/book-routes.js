const express = require("express");

const { BookController } = require("../../controllers");
const { BookMiddlewares } = require("../../middlewares");

const router = express.Router();

router.post("/", 
            BookMiddlewares.validateCreateRequest, 
            BookController.createBook);


router.get("/", BookController.getBooks);


router.get("/:id", BookController.getBook);


router.put("/:id", BookController.updateBook);


router.delete("/:id", BookController.destroyBook);

module.exports = router;