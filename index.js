const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/database/conexao')
const Tables = require('./infraestrutura/database/tables')

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


