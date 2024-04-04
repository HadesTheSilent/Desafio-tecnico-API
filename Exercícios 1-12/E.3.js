//E.3 Crie uma função que recebe vários argumentos do tipo string e imprime todosjuntos
function printAllStrings(...args) {
    const resultado = args.join('');
    console.log(resultado);
}
