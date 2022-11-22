const express = require("express");
const router = express.Router();

const xlsx = require("xlsx");
const excelFile = xlsx.readFile(__dirname + "/../public/shoes_user.xlsx");
const sheetName = excelFile.SheetNames[0];
const firstSheet = excelFile.Sheets[sheetName];
const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval: "" });

router.get("/", (req, res) => {
  res.render("login", {});
});

router.post("/register", (req, res) => {
  //length로 index할 수 있지 않을까
  const params = xlsx.utils.aoa_to_sheet([["4", req.body.id, req.body.pw]]);

  xlsx.utils.sheetName_append_sheet(sheetName, params);
  res.end();
});

router.post("/login", (req, res) => {
  const { id, pw } = req.body;
  if (id === jsonData.id && pw === jsonData.pw) {
    req.session.loginData = jsonData.id;
    req.session.save((error) => {
      if (err) console.log(error);
    });
    res.send(true);
  } else {
    res.send(false);
  }
});

router.get("/logout", (req, res) => {
  if (req.session.loginData == jsonData.id) {
    req.session.destroy((error) => {
      if (error) console.log(error);
    });
    res.send(true);
  } else {
    res.send(false);
  }
});

module.exports = router;
