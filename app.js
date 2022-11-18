const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const itemRouter = require("./routes/item");
const cartRouter = require("./routes/cart");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/item", itemRouter);
app.use("/cart", cartRouter);

//session사용
const options = {
  host: "localhost",
  port: 3002,
  id: "",
  password: "",
  database: "",
};

const sessionStore = new MySQLStore(options);

app.use(
  session({
    secret: "0000",
    resave: false,
    saveUninitialized: true,
    store: sessionStore, //저장소를 DB로 연결된 sessionStore 객체로 지정
  })
);

// error page
app.use((req, res, next) => {
  res.status(404).send("error");
});

app.listen(3002);
