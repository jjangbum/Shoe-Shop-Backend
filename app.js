const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const itemRouter = require('./routes/item');
const cartRouter = require('./routes/cart');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/item', itemRouter);
app.use('/cart', cartRouter);

// error page
app.use((req, res, next) => {
  res.status(404).send('error');
});

app.listen(3002);
