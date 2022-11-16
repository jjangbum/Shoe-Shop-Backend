const express = require('express');
const router = express.Router();

// 전체 상품 목록 페이지
router.get('/', (req, res) => {
  res.render('items', {});
});

// 상품 상세 페이지
router.get('/:id', (req, res) => {
  res.render('detail', {});
});

module.exports = router;
