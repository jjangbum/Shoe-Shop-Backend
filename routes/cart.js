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
  const cartJSON = {
    uuid: req.session.user,
    ...req.body,
  }; //json 형태로 장바구니에 담을 아이템 가져오기
  console.log(cartJSON);
  const workbook = xlsx.readFile(__dirname + '/../public/cart.xlsx');
  let worksheets = {};
  for (const sheetName of workbook.SheetNames) {
    worksheets[sheetName] = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );
  }
  worksheets.Sheet1.push(cartJSON);

  xlsx.utils.sheet_add_json(workbook.Sheets['Sheet1'], worksheets.Sheet1);
  xlsx.writeFile(workbook, path.join(__dirname + '/../public/cart.xlsx'));
  return res.json(worksheets);
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
