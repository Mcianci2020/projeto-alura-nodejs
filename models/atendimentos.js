
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

            conexao.query(sql, atendimentoDate, (erro, atendimento) => {

                if(erro){ 
                    res.status(400).json(erro) 
                } 
                else { 
                    res.status(201).json(atendimento) 
                }
            })
        }    
    }        

    
    lista(res) {

        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => {

            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })    
    }

    buscaPorId(id, res) {

            const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

            
            conexao.query(sql, (erro, resultados) => {

                const atendimento = resultados[0]

                if(erro){
                    res.status(400).json(erro)
                } else{
                    res.status(200).json(atendimento)
                }
            })
    }

    altera(id, values, res) {
        
        if(values.data){
                values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        
        const sql = `UPDATE Atendimentos SET ? WHERE id=?`

        conexao.query(sql, [values, id], (erro,resultados) => {
            
            if(erro){
                res.status(400).json(erro)
            } else{
                res.status(200).json({...valores, id})
            }  
        })
    }

    delete(id, res) {

        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        conexao.query(sql, id, (erro,resultados) => {

            if(erro){
                res.status(400).json(erro)
            } else{
                res.status(200).json({id})
            }        
        })
    }

}

module.exports = new Atendimentos
