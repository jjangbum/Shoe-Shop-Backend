const express = require("express");
const router = express.Router();

// 엑셀 읽기
const xlsx = require("xlsx"); //xlsx 모듈 추출
const excelFile = xlsx.readFile(__dirname + "/../public/shoes.xlsx"); //엑셀 파일 가져오기
const sheetName = excelFile.SheetNames[0]; //첫번째 시트 정보 추출
const firstSheet = excelFile.Sheets[sheetName]; //시트의 제목 추출
const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval: "" }); //엑셀 파일의 첫번째 시트를 읽어온다.
//console.log(jsonData);
// 메인 페이지
router.get("/", (req, res) => {
  res.render("index", {});
});

router.post("/", (req, res) => {
  console.log("주문한 제품 번호(index)", req.body.select);
  //res.write("<script>alert('ordered!!!');</script>");
  //res.write('<script>window.location="../"</script>');
  res.render("order", {
    data: jsonData,
    arr: req.body.select,
  });
});

module.exports = router;
