const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
// router.use("/order", require("./auth.routes"));
// router.use("/bascet", require("./auth.routes"));
// router.use("/salesProduct", require("./auth.routes"));
// router.use("/user", require("./auth.routes"));
router.use("/product", require("./product.routes"));
router.use("/category", require("./category.routes"));

module.exports = router;
