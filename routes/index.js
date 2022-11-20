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
  const loginStatus = '<a href="/user/login">로그인</a>';
  if (userIsLogin(req, res)) {
    loginStatus = `${req.session.loginId} | <a href="/user/logout">로그아웃</a>`;
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
