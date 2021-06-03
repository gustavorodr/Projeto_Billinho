const mongoose = require('mongoose');

const Fatura = new mongoose.Schema({
    valorFatura:{
        type: Number,
        required: true
    },
    dataVencimento:{
        type: Date,
        required: true
    },
    idMatricula:{
        type: String,
        required: true
    },
    Status:{
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    Genero:{
        type: String,
        enum: ['Aberta', 'Atrasada', 'Paga'],
        default: 'Aberta',
        required: true
    }
},
{
    //timestamps cria autotomaticamente o create at e o update at
    timestamps: true,
});

mongoose.model('fatura',Fatura);