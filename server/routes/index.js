const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/user", require("./user.routes"));
// router.use("/order", require("./order.routes"));
router.use("/bascet", require("./bascet.routes"));
// router.use("/salesProduct", require("./salesProduct.routes"));

router.use("/product", require("./product.routes"));
router.use("/category", require("./category.routes"));

module.exports = router;
