const express = require("express");
const router = express.Router();

// 메인 페이지
router.get("/index", (req, res) => {
  res.render("index", {});
});

module.exports = router;
