const express = require("express");
const router = express.Router();

const userInfo = {
  id: "a",
  password: "a",
};
// 로그인 페이지
router.get("/", (req, res) => {
  res.render("login", {});
});

// 로그인
router.post("/login", (req, res) => {
  if (req.body.id == userInfo.id && req.body.password == userInfo.password) {
    req.body.user = req.body.id;
    res.redirect("/user/approve");
  } else {
    res.redirect("/user");
  }
});

router.get("/approve", (req, res) => {
  res.render("index", {
    user: req.body.user,
  });
});

router.get("/logout", (req, res) => {
  res.render("index", {
    logout: "로그아웃 되었습니다.",
  });
});

module.exports = router;
