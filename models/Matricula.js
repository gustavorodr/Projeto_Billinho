const mongoose = require('mongoose');

const Matricula = new mongoose.Schema({
    valorTotal:{
        type: Number,
        min: 0.1,
        required: true
    },
    quantidadeFaturas:{
        type: Number,
        min: 1,
        get: v => Math.round(v),
        set: v => Math.round(v),
        required: true
    },
    diaVencimento:{
        type: Number,
        min: 1,
        max: 31,
        get: v => Math.round(v),
        set: v => Math.round(v),
        required: true
    },
    nomeCurso:{
        type: String,
        required: true
    },
    idInstituicao:{
        type: String,
        required: true
    },
    idAluno:{
        type: String,
        required: true
    }
},
{
    //timestamps cria autotomaticamente o create at e o update at
    timestamps: true,
});

mongoose.model('matricula',Matricula);