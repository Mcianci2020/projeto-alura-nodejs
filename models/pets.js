const conexao = require('../database/conexao')
const uploadfile = require('../files/uploadfiles')

class Pet {

    adciona(pet, res) {
        const query = 'INSERT INTO Pets SET ?'
        
        uploadfile(pet.imagem, pet.nome, (erro, newSource) => {

            if(erro){
                res.status(400).json(erro)

            }else{

                const newPet = { nome: pet.nome, imagem: newSource }

                conexao.query(query, newPet, erro => {

                    if(erro){
                        res.status(400).json(erro)
                    }else {
                        res.status(200).json(newPet)
                    }
                })
            }   
        })
    }
}

module.exports = new Pet