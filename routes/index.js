const express = require('express');
const router = express.Router();

// 엑셀 읽기
const xlsx = require('xlsx'); //xlsx 모듈 추출
const excelFile = xlsx.readFile(__dirname + '/../public/shoes.xlsx'); //엑셀 파일 가져오기
const sheetName = excelFile.SheetNames[0]; //첫번째 시트 정보 추출
const firstSheet = excelFile.Sheets[sheetName]; //시트의 제목 추출
const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval: '' }); //엑셀 파일의 첫번째 시트를 읽어온다.
//console.log(jsonData);

router.post('/', (req, res) => {
  const orderArr = req.body.select;
  console.log('주문한 제품 번호(index)', orderArr);
  //res.write("<script>alert('ordered!!!');</script>");
  //res.write('<script>window.location="../"</script>');
  if (req.body.productId != undefined) {
    //console.log("상품 바로 주문하기", req.body.productId);
    //제품 ID를 배열에 넣기
    var arr = new Array();
    var arr = [];
    const productId = req.body.productId;
    arr.push(productId);
    //console.log(arr);
    res.render('order', {
      data: jsonData,
      arr: arr,
    });
  }
  res.render('order', {
    data: jsonData,
    arr: orderArr,
  });
});

module.exports = router;
