const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const itemRouter = require("./routes/item");
const cartRouter = require("./routes/cart");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/item", itemRouter);
app.use("/cart", cartRouter);

//login
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser()); //요청된 쿠키를 쉽게 추출할 수 있도록 함
app.use(
  session({
    key: "userInfo",
    secret: "testSecret", //위 2개는 env파일?
    resave: false, //요청이 올 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지 설정
    saveUninitialized: false, //세션에 저장할 내용이 없더라도 처음부터 세션을 생성할지 설정
    cookie: {
      //클라이언트 웹 브라우저에 저장되는 정보
      expires: 60 * 60 * 24, //만료 시간
    },
  })
);

// error page
app.use((req, res, next) => {
  res.status(404).send("error");
});

app.listen(3002);
