let word = prompt('word');
let regExp = /\s/;
let two = 2

if (word !== '' & typeof word === 'string' & !regExp.test(word)) {
    let number = Math.round(word.length / two - 1);
    word.length === 1 
    ? alert(word) 
    : alert(word.slice(number).slice(0, -number))
} else {
    alert('Invalid word');
}