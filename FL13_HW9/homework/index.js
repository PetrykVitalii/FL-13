function convert(...arg) {
  let arrConvert = [];
  for (let i = 0; i < arg.length; i++) {
    typeof arg[i] === 'string'
      ? arrConvert.push(+arg[i])
      : arrConvert.push(`${arg[i]}`);
  }
  return arrConvert;
  do {
    
  } while (condition);
}
console.log(convert('1', 2, 3, '4'));

function executeforEach(arr, multy) {
  let arrData = [];
  for (let i = 0; i < arr.length; i++) {
    arrData.push(multy(arr[i]));
  }
  return arrData;
}
console.log(
  executeforEach([1, 2, 3], function (el) {
    return el * 2;
  })
);

function mapArray(arr, plus) {
  return executeforEach(arr, plus);
}
console.log(
  mapArray([2, '5', 8], function (el) {
    return +el + 3;
  })
);

function filterArray(arr, filter) {
  let trueArr = executeforEach(arr, filter);
  let newArr = [];
  for (let i = 0; i < trueArr.length; i++) {
    if (trueArr[i]) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
console.log(
  filterArray([2, 5, 8], function (el) {
    return el % 2 === 0;
  })
);

function containsValue(arr, number) {
  let trueArr = executeforEach(arr, (el) => {
    return el === number;
  });
  let bool;
  for (let i = 0; i < trueArr.length; i++) {
    if (trueArr[i] === true) {
      bool = true;
    }
  }
  if (!bool) {
    bool = false;
  }
  return bool;
}
console.log(containsValue([2, 5, 8], 2));

function flipOver(text) {
  let newText = '';
  for (let i = text.length - 1; i >= 0; i--) {
    newText += text[i];
  }
  return newText;
}
console.log(flipOver('hey world'));

function makeListFromRange(arr) {
  let newArr = [];
  for (let i = arr[0]; i <= arr[1]; i++) {
    newArr.push(i);
  }
  return newArr;
}
console.log(makeListFromRange([2, 7]));

const fruits = [
  { name: 'apple', weight: 0.5 },
  { name: 'pineapple', weight: 2 }
];
function getArrayOfKeys(fruits, name) {
  return executeforEach(fruits, (el) => {
    return el[name];
  });
}
console.log(getArrayOfKeys(fruits, 'name'));

function substitute(arr) {
  let min = 10;
  let max = 20;
  return mapArray(arr, (star) => {
    if (star > min && star < max) {
      star = '*'
      return star
    } else {
      return star;
    }
  });
}
console.log(substitute([58, 14, 48, 12, 31, 19, 10]));

const date = new Date(2020, 0, 2);
function getPastDay(date, number) {
  let newDate = new Date(2020, 0, 2 - number);
  let options = { month: 'short' };
  return `${newDate.getDate()} ${new Intl.DateTimeFormat('en-US',options).format(newDate)} ${newDate.getFullYear()} р.`;
}
console.log(getPastDay(date, 1));
console.log(getPastDay(date, 2));
console.log(getPastDay(date, 365));

function formatDate(date) {
  return `${date.getFullYear()}/${plusZero(date.getMonth())}/${plusZero(
    date.getDate()
  )} ${plusZero(date.getHours())}:${plusZero(date.getMinutes())}`;
}
function plusZero(date) {
  if (date < 10) {
    return `0${date}`;
  } else {
    return date;
  }
}
console.log(formatDate(new Date('6/15/2019 09:15:00')));
console.log(formatDate(new Date()));
