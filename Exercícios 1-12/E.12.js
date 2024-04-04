/*Crie uma função que recebe um objeto com o formato acima descrito e deleta o campo
"documento". a função deve devolver o objeto atualizado.
*/

const pessoa = {
    "nome": "Dev",
    "sobrenome": "smart",
    "idade": "26",
    "cargo": "analista de sistemas",
    "documento": "123.345.678-90"
}
    function deleteDocumento(obj) {
        delete obj.documento;
        return obj;
    }

    const pessoaSemDocumento = deleteDocumento(pessoa);
    console.log(pessoaSemDocumento);