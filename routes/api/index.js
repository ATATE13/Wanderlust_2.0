const router = require("express").Router();
const bookRoutes = require("./weather");

// Book routes
router.use("/books", bookRoutes);

module.exports = router;
