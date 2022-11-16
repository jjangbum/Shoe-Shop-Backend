const express = require('express');
const router = express.Router();

// 장바구니 페이지
router.get('/', (req, res) => {
  res.render('cart', {});
});

module.exports = router;
