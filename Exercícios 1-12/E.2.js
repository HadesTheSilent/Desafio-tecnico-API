/*E.2 Crie uma função que recebe três argumentos, uma função e duas string, 
aplique a função nas duas string e imprima o resultado.*/

function aplicarPrintar(func, str1, str2) {
    const result = func(str1, str2);
    console.log(result);
}