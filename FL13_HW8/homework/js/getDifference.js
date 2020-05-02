function getDifference(first, second) {
  let result;
  isBigger(first, second)
    ? (result = first - second)
    : (result = second - first);
  return result;
}

function isBigger(big, small) {
  return big > small;
}

getDifference(5, 3)
