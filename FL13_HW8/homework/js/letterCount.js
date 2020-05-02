function letterCount(word, letter) {
  let count = 0;
  word
    .toLowerCase()
    .split("")
    .forEach((let) => {
      let === letter.toLowerCase() ? count++ : count;
    });
  return count;
}

letterCount("Maggy", "g") 