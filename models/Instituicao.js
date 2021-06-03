const mongoose = require('mongoose');

const Instituicao = new mongoose.Schema({
    Nome:{
        type: String,
        unique: true,
        required: true
    },
    CNPJ:{
        type: String,
        match: /[0-9]/,
        unique: true,
        required: true
    },
    Tipo:{
        type: String,
        enum: ['Universidade', 'Escola', 'Creche'],
        required: true
    }
},
{
    //timestamps cria autotomaticamente o create at e o update at
    timestamps: true,
});

mongoose.model('instituicao',Instituicao);