const express = require('express')
const { sequelize, User} = require('./models');
const app = express()

app.use(express.json())

const path = __dirname + '/view/'
app.use(express.static(path));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

const userRouter = require("./routes/userRouter")
app.use("/api", userRouter)

app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

app.listen({ port: 5000 }, async () => {
    console.log('Server up')
    await sequelize.authenticate()
    console.log('Database connnected')
})
