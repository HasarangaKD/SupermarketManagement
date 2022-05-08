const router = require("express").Router();
const {getAllProducts , getProductById} = require("../controllers/products");


router.route("/").get(getAllProducts);
router.route("/:id").get(getProductById);

module.exports = router;