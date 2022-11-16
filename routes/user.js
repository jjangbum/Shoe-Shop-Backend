const express = require('express');
const router = express.Router();

// 로그인 페이지
router.get('/login', (req, res) => {
  res.render('login');
});

// 로그인
router.post('/login', (req, res, next) => {
  const id = req.body.id;
  const pw = req.body.pw;
});

module.exports = router;
