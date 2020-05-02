function positiveSum(arr) {
  return arr
    .filter((number) => number > 0)
    .reduce((total, number) => total + number, 0);
}

positiveSum([2, 4, 6, 8])