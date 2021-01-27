const fs = require('fs');

var dadosOrigem;

fs.readFile('C:\\UFMG\\LABORATORIO DE CONTROLE E AUTOMACAO II\\Projetos\\trunk\\MÓDULO II - CONTROLE DISTRIBUÍDO\\Matlab\\dados\\saida.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    }

    dadosOrigem = tratamentoDosDados(data);

    fs.writeFile('C:\\UFMG\\LABORATORIO DE CONTROLE E AUTOMACAO II\\Projetos\\trunk\\MÓDULO II - CONTROLE DISTRIBUÍDO\\Matlab\\dados\\saidaConvertida.txt', dadosOrigem, (err) => {
        // Caso ocorra algum erro
        if (err) {
            console.log(err);
        }
    
        // Caso não tenha erro, retornaremos a mensagem de sucesso
        console.log( 'Arquivo convertido com sucesso!');
    });

});

function tratamentoDosDados(dados){

    var temp = dados.replace(/False/g, '0');
    temp = temp.replace(/True/g, '1');
    temp = temp.replace(/,/g, '.');
    temp = temp.replace(/ < /g, '');
    temp = temp.replace(/ >  /g, ' ');
    
    return temp;
}