const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('Cors');

//inclui modelo de dados da intituicao
require("./models/Instituicao");
const Instituicao = mongoose.model('instituicao');

//seta formato json para o express
const server = express();
server.use(express.json());

//middleware para controle de acesso (obs: mudar "*" para endereço da aplicação que ira utilizar os dados da API)
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    server.use(cors());
    next();
});

//conecta ou cria banco de dados no MongoDB
mongoose.connect('mongodb://localhost:27017/local', {
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
        });
    });
});

//rota para busca pelo id da instituição no banco
server.get("/instituicao/:id", (req, res) =>{
    Instituicao.findOne({_id: req.params.id}).then((instituicao) => {
        return res.json(instituicao);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "id doesn't match any record"
        });
    });
});

//rota para cadastro de instituicao
server.post("/instituicao", (req, res) => {
    const instituicao = Instituicao.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error when registering in the database"
        });
        return res.json({error: false});
    });
});

//rota para edição das instituições no banco
server.put("/instituicao/:id", (req, res) => {
    const instituicao = Instituicao.updateOne({ _id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error editing the record in the database"
        });
        return res.json({error: false});
    });
});

//rota para apagar instituições do banco
server.delete("/instituicao/:id", (req, res) =>{
    const instituicao = Instituicao.deleteOne({_id: req.params.id}, (err) =>{
        if(err) return res.status(400).json({
            error: true,
            message: "Error deleting record in database"
        });
        return res.json({error: false});
    });
});

server.listen(8080, () =>{
    console.log("Server running at: http://localhost:8080");
});