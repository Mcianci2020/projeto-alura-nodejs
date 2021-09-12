

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Voce esta na rota atendimentos e esta realizando um GET'))

    app.post('/atendimentos', (req,res) => {
        console.log(req.body)
        res.send('Voces esta na rota de atendimento e esta realizando um POST')   
    })
}