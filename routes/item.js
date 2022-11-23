const express = require('express');
const router = express.Router();
const xlsx = require('xlsx'); //xlsx 모듈 추출

// 엑셀에서 상품 데이터 읽기
router.use((req, res, next) => {
  const excelFile = xlsx.readFile(__dirname + '/../public/shoes.xlsx'); //엑셀 파일 가져오기
  const sheetName = excelFile.SheetNames[0]; //첫번째 시트 정보 추출
  const firstSheet = excelFile.Sheets[sheetName]; //시트의 제목 추출
  const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval: '' }); //엑셀 파일의 첫번째 시트를 읽어온다.
  req.jsonData = jsonData;
  next();
});

// 전체 상품 조회
router.get('/', (req, res) => {
  res.json(req.jsonData);
});

// 특정 상품 조회
router.get('/:id', (req, res) => {
  const data = req.jsonData;
  const id = req.params.id;
  data.forEach((item) => {
    if (item.index == id) return res.json(item);
  });
  return res.send(false);
});

module.exports = router;
