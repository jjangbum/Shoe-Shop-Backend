const express = require("express");
const router = express.Router();

// 메인 페이지
router.get("/", (req, res) => {
  res.render("index", {});
});

router.post("/", (req, res) => {
  console.log("주문한 제품 번호(index)", req.body.select);
  res.write("<script>alert('ordered!!!');</script>");
  res.write('<script>window.location="../index"</script>');
});

module.exports = router;
