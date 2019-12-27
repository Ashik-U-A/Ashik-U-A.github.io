let express = require("express");
let path = require("path");

let app = express();

app.use(express.static(path.resolve(__dirname)))
    .get("/", (req, res)=>{
        res.sendFile(path.join(__dirname, "index.html"));
    })
    .listen(3000, ()=>{
        console.log("Server Ready and Listening to PORT : 3000");
    });