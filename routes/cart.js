const express = require('express');
const router = express.Router();

// 장바구니 엑셀 읽기
// 사용자 uuid(고유값)로 필터링해서 현재 로그인한 사용자의 장바구니 데이터 만들어주는 미들웨어
router.use((req, res, next) => {
  const excelFile = xlsx.readFile(__dirname + '/../public/cart.xlsx'); //엑셀 파일 가져오기
  const sheetName = excelFile.SheetNames[0]; //첫번째 시트 정보 추출
  const firstSheet = excelFile.Sheets[sheetName]; //시트의 제목 추출
  const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval: '' }); //엑셀 파일의 첫번째 시트를 읽어온다.
  next();
});

// 장바구니 조회
router.get('/', (req, res) => {
  console.log(req.jsonData.length);
});

// 장바구니 추가
router.post('/', (req, res) => {
  const productId = req.body.productId;
  arr.push(productId);
  // 직접적으로 엑셀 작성
});

// 장바구니 삭제
router.delete('/', (req, res) => {});

module.exports = router;
