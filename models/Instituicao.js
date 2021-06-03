const mongoose = require('mongoose');

const Instituicao = new mongoose.Schema({
    Nome:{
        type: String,
        required: true
    },
    CNPJ:{
        type: String,
        required: true
    },
    Tipo:{
        type: String,
        required: true
    }
},
{
    //timestamps cria autotomaticamente o create at e o update at
    timestamps: true,
});

mongoose.model('instituicao',Instituicao);