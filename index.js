const express = require('express');

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    return res.json({title: "API_Billinho"})
});

server.listen(8080, () =>{
    console.log("Server running at: http://localhost:8080");
});