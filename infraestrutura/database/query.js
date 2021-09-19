const conexao = require('./conexao')

const executeQuery = (query, param = '') => {
    return new Promise((resolve, reject) => {
        conexao.query(query, param, (erros, result, campos) => {
            if(erros){
                reject(erros)
            }
            else {
                resolve(result)
            }
        })    
    })
}

module.exports = executeQuery