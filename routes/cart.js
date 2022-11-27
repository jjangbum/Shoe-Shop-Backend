const express = require("express");
const router = express.Router();
const xlsx = require("xlsx"); //xlsx 모듈 추출
const path = require("path");

// 장바구니 엑셀 읽기
// 사용자 uuid(고유값)로 필터링해서 현재 로그인한 사용자의 장바구니 데이터 만들어주는 미들웨어
router.use((req, res, next) => {
  const excelFile = xlsx.readFile(__dirname + "/../public/cart.xlsx"); //엑셀 파일 가져오기
  const sheetName = excelFile.SheetNames[0]; //첫번째 시트 정보 추출
  const firstSheet = excelFile.Sheets[sheetName]; //시트의 제목 추출
  const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval: "" }); //엑셀 파일의 첫번째 시트를 읽어온다.
  req.jsonData = jsonData;
  next();
});

// 장바구니 조회
router.get("/", (req, res) => {
  //console.log(req.jsonData.length);
  res.json(req.jsonData);
});

// 장바구니 추가
router.post("/", (req, res) => {
  //장바구니에 담을 json data
  const cartJSON = req.body.jsondata; //json 형태로 장바구니에 담을 아이템 가져오기
  // 직접적으로 엑셀 작성
  const excelFile = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(cartJSON);
  xlsx.utils.book_append_sheet(excelFile, ws, "Sheet1");
  xlsx.writeFile(excelFile, path.join(__dirname + "/../public/cart.xlsx"));
});

// 장바구니 삭제
router.delete("/", (req, res) => {});

module.exports = router;
