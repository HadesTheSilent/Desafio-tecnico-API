/*E.5 Dado o dicionário {'a': 4, 'e' :3 ,'i' :1 , 's': 5 } substitua os números
na frase 'T35t3 d3 35t4g1o'pelos valores de suas respectivas keys, por exemplo a
frase ol4 ficaria ola.*/
const dictionary = { 'a': 4, 'e': 3, 'i': 1, 's': 5 };
const phrase = 'T35t3 d3 35t4g1o';
const replacedPhrase = phrase.replace(/\d/g, (match) => dictionary[match]);
console.log(replacedPhrase);
