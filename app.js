const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const itemRouter = require('./routes/item');
const cartRouter = require('./routes/cart');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/item', itemRouter);
app.use('/cart', cartRouter);

app.use((req, res, next, err) => {
  res.status(500).json({ message: 'Sever Error' });
});

// error page
app.use((req, res, next) => {
  res.status(404).json({ message: '404' });
});

app.listen(3002);
