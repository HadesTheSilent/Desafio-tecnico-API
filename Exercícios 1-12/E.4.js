//● E.4 Dado a seguinte string 'teste 1 de 2 string 3', substitua todas as ocorrências de números pelo valor '[removido]'.
const str = 'teste 1 de 2 string 3';
const replacedStr = str.replace(/\d+/g, '[removido]'); //regex
console.log(replacedStr);
