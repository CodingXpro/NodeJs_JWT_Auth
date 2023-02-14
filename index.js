const express = require('express')
const app = express();
const auth = require('./routes/auth');
const post = require('./routes/post');

app.use(express.json());
app.use("/auth", auth);
app.use("/post", post);

app.get('/', (req, res) => {
    res.send("hello world");
})




app.listen(5000, () => {
    console.log("server is runnning on 5000");
})