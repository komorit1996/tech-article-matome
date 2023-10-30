const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3030;
//
const qiitaRouter = require("./routes/qiita");
const zennRouter = require("./routes/zenn");
const mongoose = require("mongoose");
require("dotenv").config();
// cors 対策
app.use(cors({
    origin: 'http://localhost:5173'
}));
// database
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Create Connection DB...");
    console.log("コネクションを作成しました。");
}).catch((err) => {
    console.log(err);
});

// middleware
app.use("/api/qiita", qiitaRouter);
app.use("/api/zenn", zennRouter);

// Routing test
app.get("/", (req, res) => {
    res.send("Hello World");
});

//
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
