const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');
const fs = require('fs');

var dadosDestino = '';
var count = 0;

(async function processLineByLine() {
  try {
    const rl = createInterface({
      input: createReadStream('C:\\UFMG\\LABORATORIO DE CONTROLE E AUTOMACAO II\\Projetos\\trunk\\MÓDULO II - CONTROLE DISTRIBUÍDO\\Matlab\\dados\\saida.txt'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
        
        let temp = line.replace(/False/g, '0');
        temp = temp.replace(/True/g, '1');
        temp = temp.replace(/,/g, '.');
        temp = temp.replace(/(\ <)(.*?)(\> )/g, count);
        temp += temp + '\n';
    
        dadosDestino += temp;
        
        count++;
    });

    await once(rl, 'close');

    fs.writeFile('C:\\UFMG\\LABORATORIO DE CONTROLE E AUTOMACAO II\\Projetos\\trunk\\MÓDULO II - CONTROLE DISTRIBUÍDO\\Matlab\\dados\\saidaConvertida.txt', dadosDestino, (err) => {
        // Caso ocorra algum erro
        if (err) {
            console.log(err);
        }

        // Caso não tenha erro, retornaremos a mensagem de sucesso
        console.log( 'Arquivo convertido com sucesso!');
    });

  } catch (err) {
    console.error(err);
  }
})();

// const fs = require('fs');
// const readline = require('readline');

// const readInterface = readline.createInterface({
//     input: fs.createReadStream('C:\\UFMG\\LABORATORIO DE CONTROLE E AUTOMACAO II\\Projetos\\trunk\\MÓDULO II - CONTROLE DISTRIBUÍDO\\Matlab\\dados\\saida.txt'),
//     // output: process.stdout,
//     // console: false
// });


// var dadosDestino;
// var count = 0;

// // fs.readFile('C:\\UFMG\\LABORATORIO DE CONTROLE E AUTOMACAO II\\Projetos\\trunk\\MÓDULO II - CONTROLE DISTRIBUÍDO\\Matlab\\dados\\saida.txt', 'utf8', (err, data) => {

// readInterface.on('line', async function(line) {
//     dadosDestino += tratamentoDosDados(line, count);
//     count++;
// }). on('close', () => {
//     res(dadosDestino);
// });

// console.log(dadosDestino)

// // fs.writeFile('C:\\UFMG\\LABORATORIO DE CONTROLE E AUTOMACAO II\\Projetos\\trunk\\MÓDULO II - CONTROLE DISTRIBUÍDO\\Matlab\\dados\\saidaConvertida.txt', dadosDestino, (err) => {
// //     // Caso ocorra algum erro
// //     if (err) {
// //         console.log(err);
// //     }

// //     // Caso não tenha erro, retornaremos a mensagem de sucesso
// //     console.log( 'Arquivo convertido com sucesso!');
// // });

function tratamentoDosDados(dados, numLine){

    let temp = dados.replace(/False/g, '0');
    temp = temp.replace(/True/g, '1');
    temp = temp.replace(/,/g, '.');
    temp = temp.replace(/(\<)(.*?)(\>)/g, numLine);
    return temp;
}