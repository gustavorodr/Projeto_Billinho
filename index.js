const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');

//inclui modelo de dados da intituicao
require("./models/Instituicao");
const Instituicao = mongoose.model('instituicao');

//seta formato json para o express
const server = express();
server.use(express.json());

//conecta ou cria banco de dados no MongoDB
mongoose.connect('mongodb://localhost/billinhoDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("Successful database connection");
}).catch((erro) => {
    console.log("Database connection error");
});

//rota para listagem de todo o banco de dados
server.get("/", (req, res) => {
    Instituicao.find({}).then((instituicao) =>{
        return res.json(instituicao);
    }).catch((err) =>{
        return res.status(400).json({
            error: true,
            message: "Empty database"
        })
    })
});

//rota para busca pelo id da instituição no banco
server.get("/instituicao/:id", (req, res) =>{
    Instituicao.findOne({_id: req.params.id}).then((instituicao) => {
        return res.json(instituicao);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "id doesn't match any record"
        })
    })
})

//rota para cadastro de instituicao
server.post("/instituicao", (req, res) => {
    const instituicao = Instituicao.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error when registering in the database"
        })
        return res.status(200).json({
            error: false,
            message: "Registration in the database done successfully"
        })
    })
});


server.listen(8080, () =>{
    console.log("Server running at: http://localhost:8080");
});