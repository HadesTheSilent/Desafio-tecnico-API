/*● E.6 Utilizando a api da viacep (https://viacep.com.br/) e o seu cep como entrada
imprima o seu endereço no formato 'ENDERECO, NUMERO, CIDADE/ESTADO'.
*/

function imprimeEndereco() {
    const cep = '36025190';
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            const address = `${data.logradouro}, ${data.numero}, ${data.localidade}/${data.uf}`;
            console.log(address);
        })
        .catch(error => console.error('Error:', error));
}

imprimeEndereco();

/*
O output é:
Rua Guacuí, undefined, Juiz de Fora/MG
O número não é retornado pela API.
*/