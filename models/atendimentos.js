
const { default: axios } = require('axios')
const moment = require('moment')
const conexao = require('../infraestrutura/database/conexao')
const repositorio = require('../repository/atendimento')


class Atendimentos {
    

    constructor() {

        this.dataValidate = ({data, dataCreate}) => moment(data).isSameOrAfter(dataCreate)
        this.ClientValidate = (tamanho) => tamanho >= 5
        this.valida = parametros => this.validates.filter(campo => {

            const { nome } = campo 
            const parametro = parametros[nome] 
            
            return !campo.valido(parametro)
        })

        this.validates = [
            {
                nome: 'data',
                valido: this.dataValidate,
                mensagem: 'Data dever ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.ClientValidate,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

    }

    adciona(atendimento, res) {

        const dataCreate = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const parametros = { 
            data: { data, dataCreate },
            cliente: { tamanho: atendimento.cliente.length } 
        }

        const error = this.valida(parametros)
        const ExistError = error.length

        if(ExistError){
            return new Promise((reject) => reject(erros))
        } else{

            const atendimentoDate = { ...atendimento, dataCreate, data}
            return repositorio.adciona(atendimentoDate)
                .then( result => {
                    const id = result.insertId
                    return { ...atendimento, id }
                })            
        }    
    }        

    
    lista() {

        return repositorio.lista()
            
    }

    buscaPorId(id, res) {

            const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

            
            conexao.query(sql, async (erro, resultados) => {

                const atendimento = resultados[0]
                const cpf = atendimento.cliente

                if(erro){
                    res.status(400).json(erro)
                } else{
                    const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                    atendimento.cliente = data
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
