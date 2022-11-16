const express = require("express");
const router = express.Router();

// 엑셀 읽기
const xlsx = require("xlsx"); //xlsx 모듈 추출
const excelFile = xlsx.readFile(__dirname + "/../public/shoes.xlsx"); //엑셀 파일 가져오기
const sheetName = excelFile.SheetNames[0]; //첫번째 시트 정보 추출
const firstSheet = excelFile.Sheets[sheetName]; //시트의 제목 추출
const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval: "" }); //엑셀 파일의 첫번째 시트를 읽어온다.
//console.log(jsonData);

//장바구니 Array
var arr = new Array();
var arr = [];

// 장바구니 페이지
router.get("/", (req, res) => {
  res.render("cart", {
    data: jsonData,
    arr: arr,
  });
});

router.post("/", (req, res) => {
  var productId = req.body.productId;
  arr.push(productId);
  res.write("<script>alert('added to cart');</script>"); //장바구니에 담았다는 alert 띄우고
  res.write('<script>window.location="../item"</script>'); //item 페이지로 돌아온다.
});

module.exports = router;
