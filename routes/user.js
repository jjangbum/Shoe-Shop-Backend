const express = require("express");
const router = express.Router();
const xlsx = require("xlsx");

router.use("/", (req, res, next) => {
  // 엑셀 데이터 불러오기
  const excelFile = xlsx.readFile(__dirname + "/../public/shoes_user.xlsx");
  const sheetName = excelFile.SheetNames[0];
  const firstSheet = excelFile.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval: "" });
  req.jsonData = jsonData;
  next();
});

// 로그인 상태 확인
router.get("/check", (req, res) => {
  return req.session.userInfo ? res.send(true) : res.send(false);
});

// 회원가입
// router.post('/register', (req, res) => {
//   const { id, pw } = req.body;
//   const params = xlsx.utils.aoa_to_sheet([['4', req.body.id, req.body.pw]]);
//   xlsx.utils.sheetName_append_sheet(sheetName, params);
//   res.end();
// });

// 로그인
router.post("/login", (req, res) => {
  const { id, pw } = req.body;
  req.jsonData.forEach((user) => {
    console.log(user);
    if (id === user.id && pw === user.pw) {
      return res.send(true);
    }
  });
  res.send(false);
});

// 로그아웃
router.post("/logout", (req, res) => {
  if (req.session.userInfo) {
    req.session.destroy((error) => {
      if (error) console.log(error);
    });
    res.send(true);
  } else {
    res.send(false);
  }
});

module.exports = router;
