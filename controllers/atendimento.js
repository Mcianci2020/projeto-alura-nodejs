const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Voce esta na rota atendimentos e esta realizando um GET'))

    app.post('/atendimentos', (req,res) => {
        const atendimento = req.body
        
        Atendimento.adciona(atendimento)
        res.send('Atendimento POST')   
    })
}