const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('Cors');

//inclui modelos
require("./models/Instituicao");
const Instituicao = mongoose.model('instituicao');
require("./models/Aluno");
const Aluno = mongoose.model('aluno');
require("./models/Matricula");
const Matricula = mongoose.model('matricula');
require("./models/Fatura");
const Fatura = mongoose.model('matricula');

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
mongoose.connect('mongodb://localhost:27017/billinhoDB', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Successful database connection");
}).catch((erro) => {
    console.log("Database connection error");
});

//############################# ROTAS DE INSTITUICAO ##############################
//rota para listagem de todo o banco de dados
server.get("/instituicoes", (req, res) => {
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
server.post("/instituicaoCad", (req, res) => {
    const instituicao = Instituicao.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error when registering in the database"
        });
        return res.json({error: false});
    });
});

//rota para edição das instituições no banco
server.put("/instituicaoEdit/:id", (req, res) => {
    const instituicao = Instituicao.updateOne({ _id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error editing the record in the database"
        });
        return res.json({error: false});
    });
});

//rota para apagar instituições do banco
server.delete("/instituicaoDel/:id", (req, res) =>{
    const instituicao = Instituicao.deleteOne({_id: req.params.id}, (err) =>{
        if(err) return res.status(400).json({
            error: true,
            message: "Error deleting record in database"
        });
        return res.json({error: false});
    });
});

//############################# ROTAS DE ALUNO ##############################
//rota para listagem de todo o banco de dados
server.get("/Alunos", (req, res) => {
    Aluno.find({}).then((aluno) =>{
        return res.json(aluno);
    }).catch((err) =>{
        return res.status(400).json({
            error: true,
            message: "Empty database"
        });
    });
});

//rota para busca pelo id do aluno no banco
server.get("/aluno/:id", (req, res) =>{
    Aluno.findOne({_id: req.params.id}).then((aluno) => {
        return res.json(aluno);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "id doesn't match any record"
        });
    });
});

//rota para cadastro de aluno
server.post("/alunoCad", (req, res) => {
    const aluno = Aluno.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error when registering in the database"
        });
        return res.json({error: false});
    });
});

//rota para edição dos alunos no banco
server.put("/alunoEdit/:id", (req, res) => {
    const aluno = Aluno.updateOne({ _id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error editing the record in the database"
        });
        return res.json({error: false});
    });
});

//rota para apagar alunos do banco
server.delete("/alunoDel/:id", (req, res) =>{
    const aluno = Aluno.deleteOne({_id: req.params.id}, (err) =>{
        if(err) return res.status(400).json({
            error: true,
            message: "Error deleting record in database"
        });
        return res.json({error: false});
    });
});

//############################# ROTAS DE MATRICULA ##############################
//rota para listagem de todo o banco de dados
server.get("/Matriculas", (req, res) => {
    Matricula.find({}).then((matricula) =>{
        return res.json(matricula);
    }).catch((err) =>{
        return res.status(400).json({
            error: true,
            message: "Empty database"
        });
    });
});

//rota para busca pelo id da matricula no banco
server.get("/matricula/:id", (req, res) =>{
    Matricula.findOne({_id: req.params.id}).then((matricula) => {
        return res.json(matricula);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "id doesn't match any record"
        });
    });
});

//rota para cadastro de matricula
server.post("/matriculaCad", (req, res) => {
    const matricula = Matricula.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error when registering in the database"
        });
        //função que cria faturas
        var data = new Date();
        var dia = Number(data.getDate()).padStart(2, '0');
        var mes = Number(data.getMonth() + 1).padStart(2, '0');
        var ano = Number(data.getFullYear());
        for(var i = 0; i < req.body.quantidadeFaturas; i++){
            //define a data do pagamento
            var dataPagamento = new Date();
            mes+=i;
            if(dia<=req.body.diaVencimento){
                mes++;
            }
            if(mes == 13){
                mes=1;
                ano++;
            }
            dataPagamento.setDay(req.body.diaVencimento);
            dataPagamento.setMonth(mes);
            dataPagamento.setFullYear(ano);
            //cria fatura
            const fatura = Fatura.create(json({
                "valorFatura" : req.body.quantidadeFaturas/req.body.quantidadeFaturas,
                "dataVencimento" : dataPagamento,
                "idMatricula" : matricula._id,
                "Status" : 'Aberta'
            }), (err) => {
                if(err) return res.status(400).json({
                    error: true,
                    message: "Error when registering in the database"
                });
            });
        }
        return res.json({error: false});
    });
});

//rota para edição das matriculas no banco
server.put("/matriculaEdit/:id", (req, res) => {
    const matricula = Matricula.updateOne({ _id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error editing the record in the database"
        });
        
        return res.json({error: false});
    });
});

//rota para apagar matriculas do banco
server.delete("/matriculaDel/:id", (req, res) =>{
    const matricula = Matricula.deleteOne({_id: req.params.id}, (err) =>{
        if(err) return res.status(400).json({
            error: true,
            message: "Error deleting record in database"
        });
        return res.json({error: false});
    });
});

//############################# ROTAS DE FATURA ##############################
//rota para listagem de todo o banco de dados
server.get("/Faturas", (req, res) => {
    Fatura.find({}).then((fatura) =>{
        return res.json(fatura);
    }).catch((err) =>{
        return res.status(400).json({
            error: true,
            message: "Empty database"
        });
    });
});

//rota para busca pelo id da fatura no banco
server.get("/fatura/:id", (req, res) =>{
    Fatura.findOne({_id: req.params.id}).then((fatura) => {
        return res.json(fatura);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "id doesn't match any record"
        });
    });
});

//rota para cadastro de fatura na mão
server.post("/faturaCad", (req, res) => {
    const fatura = Fatura.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error when registering in the database"
        });
        return res.json({error: false});
    });
});

//rota para edição das faturas no banco
server.put("/faturaEdit/:id", (req, res) => {
    const fatura = Fatura.updateOne({ _id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error editing the record in the database"
        });
        return res.json({error: false});
    });
});

//rota para apagar faturas do banco
server.delete("/faturaDel/:id", (req, res) =>{
    const fatura = Fatura.deleteOne({_id: req.params.id}, (err) =>{
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