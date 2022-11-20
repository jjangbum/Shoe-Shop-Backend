const { response } = require("express");
const express = require("express");
const router = express.Router();
const session = require("express-session");
const FileStore = require("session-file-store")(session);

router.use(
  session({
    secret: "a0b0c0d0",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(), //저장소
  })
);

const userInfos = {
  id: "doraemon49",
  password: "0000", //비밀번호 암호화 or hash하는법 적용해보자
};
// {
//   id: "Bokyeom",
//   password: "0000",
// },
// {
//   id: "haejun1",
//   password: "0000",
// },
router.get("/", (req, res) => {
  res.render("login", {});
});

router.post("/login", (req, res) => {
  const userInfo = req.body;
  const id = userInfo.id;
  const password = userInfo.password;
  if (id === userInfos.id && password === userInfos.password) {
    req.session.isLogin = true;
    req.session.loginId = userInfos.id;
    req.session.save(function () {
      res.redirect("/");
    });
  } else {
    res.send("사용자 정보가 없습니다");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    response.redirect("/");
  });
});

module.exports = router;
