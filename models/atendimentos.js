
const moment = require('moment')
const conexao = require('../database/conexao')


class Atendimentos {

    adciona(atendimento, res) {

        const dataCreate = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const dataValidate = moment(data).isSameOrAfter(dataCreate)
        const ClientValidate = atendimento.cliente.length >= 5
        
        const validates = [
            {
                nome: 'data',
                valido: dataValidate,
                mensagem: 'Data dever ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: ClientValidate,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
        
        const error = validates.filter(campo => !campo.valido)
        const ExistError = error.length

        if(ExistError){
            res.status(400).json(error)
        } else{

    
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
}

module.exports = new Atendimentos
