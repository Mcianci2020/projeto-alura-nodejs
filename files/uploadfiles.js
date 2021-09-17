const fs = require('fs')


fs.createReadStream("./assets/pitbull.jpeg")
    .pipe(fs.createWriteStream('./assets/pitbull-stream.jpeg'))
    .on('finish', () => console.log('Imagem escrita com sucesso!!!'))

