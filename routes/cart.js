const express = require('express');
const router = express.Router();
const xlsx = require('xlsx');
const path = require('path');
const { execFile } = require('child_process');

// 장바구니 엑셀 읽기
router.use((req, res, next) => {
  const excelFile = xlsx.readFile(__dirname + '/../public/cart.xlsx');
  const sheetName = excelFile.SheetNames[0];
  const firstSheet = excelFile.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval: '' });
  req.jsonData = jsonData;
  next();
});

// 장바구니 조회
router.get('/', (req, res) => {
  const carData = req.jsonData;
  const uuid = req.session.user;
  console.log(uuid);
  const cartArr = [];
  carData.forEach((item) => {
    if (item.uuid === uuid) {
      cartArr.push(item);
    }
  });
  return res.json(cartArr);
});

// 장바구니 추가
router.post('/', (req, res) => {
  //장바구니에 담을 json data
  const cartJSON = req.body; //json 형태로 장바구니에 담을 아이템 가져오기
  console.log(cartJSON);

  // 직접적으로 엑셀 작성
  //const test = xlsx.readFile(__dirname + "/../public/cart.xlsx"); //엑셀 파일 가져오기
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.sheet_add_json(cartJSON);
  //sheet_add_json ; adds an array of JS objects to an existing worksheet.
  //or
  //json_to_sheet ;  converts an array of JS objects to a worksheet.

  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  xlsx.writeFile(wb, path.join(__dirname + '/../public/cart.xlsx'));
});

// 장바구니 삭제
router.delete('/:id', (req, res) => {
  const data = req.jsonData;
  const id = req.params.id;
  const course = data.find((item) => item.index == id);
  const deleteIndex = data.indexOf(course);
  data.splice(deleteIndex, 1);

  res.json(data);
});

module.exports = router;
