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

router.get("/login", (req, res) => {
  const post = req.body;
  db.query(
    "select member.id as id, password, author_id, name from member left join author on member.author_id = author.id where member.id=? and password=?",
    [post.id, post.password],
    (err, result) => {
      if (err) throw err;
      if (result[0] !== undefined) {
        req.session.uid = result[0].id;
        req.session.author_id = result[0].author_id;
        req.session.isLogined = true;
        req.session.save(function () {
          res.redirect("/");
        });
      }
    }
  );
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
  delete req.session.uid;
  delete req.session.isLogined;
  delete req.session.author_id;

  req.session.save(function () {
    res.render("index", {
      logout: "로그아웃 되었습니다.",
    });
  });
});

module.exports = router;
