const fs = require('fs')
const path = require('path')

module.exports = (caminho, nameFile, callbackCreateImage) => {

    const typeValidate = ['jpeg','png','jpeg']
    const type = path.extname(caminho)
    const validate = typeValidate.indexOf(type.substring(1)) !== -1

    if(validate){

        const newSource = `./assets/images/${nameFile}${type}`    
        
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(newSource))
            .on('finish', () => callbackCreateImage(false,newSource))
        
    }
    else {
    
        const erro = "Tipo invalido!!!"
        console.log('Erro tipo invalido!!!')
        callbackCreateImage(erro)

    }
}





