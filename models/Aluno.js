const mongoose = require('mongoose');

const Aluno = new mongoose.Schema({
    Nome:{
        type: String,
        unique: true,
        required: true
    },
    CPF:{
        type: String,
        match: /[0-9]/,
        unique: true,
        required: true
    },
    dataNascimento:{
        type: Date
    },
    Celular:{
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    Genero:{
        type: String,
        enum: ['M', 'F'],
        required: true
    },
    meioPagamento:{
        type: String,
        enum: ['Boleto', 'Cartão'],
        required: true
    }
},
{
    //timestamps cria autotomaticamente o create at e o update at
    timestamps: true,
});

mongoose.model('aluno',Aluno);