const express = require('express');
const xlsx = require('xlsx');
const bcrypt = require('bcrypt');

const router = express.Router();

// 엑셀에서 user 데이터 불러오기
router.use('/', (req, res, next) => {
  const excelFile = xlsx.readFile(__dirname + '/../public/shoes_user.xlsx');
  const sheetName = excelFile.SheetNames[0];
  const firstSheet = excelFile.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval: '' });
  req.jsonData = jsonData;
  next();
});

// 로그인 상태 확인
router.get('/check', (req, res) => {
  const status = req.session.user ? res.send(true) : res.send(false);
  console.log(req.session.user);
  return status;
});

// 로그인
router.post('/login', (req, res) => {
  const { id, pw } = req.body;
  const user = req.jsonData.find((item) => id === item.id);
  if (user) {
    const result = bcrypt.compareSync(pw, user.pw);
    req.session.user = result ? user.uuid : null;
    console.log('>> 로그인 - ' + req.session.user);
    return res.send(result);
  }
  return res.send(false);
});

// 로그아웃
router.post('/logout', (req, res) => {
  console.log('>> 로그아웃 - ' + req.session.user);
  if (req.session.user) {
    req.session.destroy((error) => {
      if (error) console.log(error);
    });
    return res.send(true);
  }
  return res.send(false);
});

module.exports = router;
