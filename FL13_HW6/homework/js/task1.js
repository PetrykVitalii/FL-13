let checkNumber = +prompt('Check number');
let sto = 100

if (checkNumber > 0) {
  let tip = +prompt('Tip');
  if (tip > 0 & tip <= sto) {
    let tipSum = Math.round(checkNumber * tip) / sto;
    let sum = tipSum + checkNumber;
    alert(
      `Check number: ${checkNumber} Tip: ${tip}% Tip amount: ${tipSum} Total sum to pay: ${sum}`
    );
  } else {
    alert('Invalid Tip');
  }
} else {
  alert('Invalid Check number');
}
