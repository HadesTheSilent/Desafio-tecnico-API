//array
const pessoas = [
    { id: 1, nome: 'juca', sobrenome: 'da silva', idade: 42 },
    { id: 2, nome: 'daniel', sobrenome: 'gonçalves', idade: 21 },
    { id: 3, nome: 'matheus', sobrenome: 'garcia', idade: 28 },
    { id: 4, nome: 'gabriel', sobrenome: 'pinheiro', idade: 21 }
];

//E.7
pessoas.forEach(pessoa => {
    const nomeCompleto = `${pessoa.nome.charAt(0).toUpperCase()}${pessoa.nome.slice(1)} ${pessoa.sobrenome.charAt(0).toUpperCase()}${pessoa.sobrenome.slice(1)}`;
    console.log(`Olá, ${nomeCompleto}!`);
});
//o código está percorrendo cada objeto no array e deixando a primeira letra das propriedades nome e sobrenome em maiúsculo.
// Depois, está imprimindo uma mensagem de saudação para cada pessoa.

//E.8
const somaIdades = pessoas.reduce((total, pessoa) => total + pessoa.idade, 0);
console.log(`A soma das idades é ${somaIdades}.`);

//E.9

const pessoaMenos25 = pessoas.filter(pessoa => pessoa.idade < 25);
if (pessoaMenos25) {
    console.log(pessoaMenos25);
} else {
    console.log("Não há ninguém com menos de 25 anos.");
}

//para retornar só o primeiro id com < 25 anos, basta trocar o filter por find.

//E.10
const pessoasMenos30 = pessoas.filter(pessoa => pessoa.idade < 30);
console.log(pessoasMenos30);
//retorna um array com todas as pessoas que têm menos de 30 anos.

//E.11
const pessoasOrdenadas = pessoas.sort((a, b) => {
    if (a.idade === b.idade) {
        return b.id - a.id;
    }
    return b.idade - a.idade;
});

console.log(pessoasOrdenadas);