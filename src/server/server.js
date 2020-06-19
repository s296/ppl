const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const categoryRouter = require('./categoryRouter');

mongoose.connect('mongodb://localhost:27017/ppl', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.static('./pics'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/user",userRouter);
app.use("/post",postRouter);
app.use("/category",categoryRouter);

app.listen(3001, () => {
    console.log('Server is on');
})


