
const moment = require('moment')
const conexao = require('../database/conexao')


class Atendimentos {

    adciona(atendimento, res) {

        const dataCreate = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const atendimentoDate = { ...atendimento, dataCreate, data}

        const sql = 'INSERT INTO Atendimentos SET ?'

        conexao.query(sql, atendimentoDate, (erro, resultados) => {

            if(erro){ 
                res.status(400).json(erro) 
            } 
            else { 
                res.status(201).json(resultados) 
            }
        })
    }        
}

module.exports = new Atendimentos
