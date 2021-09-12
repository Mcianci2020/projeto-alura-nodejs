const customExpress = require('./config/customExpress')
const conexao = require('./database/conexao')
const Tables = require('./database/tables')

conexao.connect( erro => {
    if(erro) {
        console.log(erro)
    } else {
        console.log('MySQL - Conectado com sucesso!!!')
    
        Tables.init(conexao)    
        const app = customExpress()

        app.listen(3000, () => console.log('Servidor rodando na porta 3000!!!!'))
    
    }
})


