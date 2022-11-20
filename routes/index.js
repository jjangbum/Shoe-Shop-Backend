const express = require("express");
const router = express.Router();

function userIsLogin(req, res) {
  if (req.session.isLogin) {
    return true;
  } else {
    return false;
  }
}

function loginStatus(req, res) {
  const loginStatus = "안녕하세요";
  if (userIsLogin(req, res)) {
    loginStatus = `${req.session.loginId} | "안녕하세요"`;
  }
  return loginStatus;
}

// 메인 페이지
router.get("/", (req, res) => {
  res.render("index", {
    loginStatus: loginStatus(req, res),
  });
});

module.exports = router;
