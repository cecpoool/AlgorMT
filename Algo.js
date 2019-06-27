const csv = require("csv-parser");
const fs = require("fs");
let data = [];

//READ FILE AND SAVE - INCLUDING PARSING TO NUMBER
fs.createReadStream("unsorted_numbers.csv")
  .pipe(csv())
  .on("data", row => {
    data.push(JSON.parse(row.Number));
  })
  .on("end", () => {
    // console.log(data);
  });

//INSERTIONS SORT
function insertionSort(data) {
  for (var i = 0; i < data.length; i++) {
    let value = data[i];
    for (var j = i - 1; j > -1 && data[j] > value; j--) {
      data[j + 1] = data[j];
    }
    data[j + 1] = value;
  }

  return data;
}
console.time("INSERTSORT");
setTimeout(() => insertionSort(data), 1500);
console.timeEnd("INSERTSORT");

//SHELLSORT
function shellSort(data) {
  var increment = data.length / 2;
  while (increment > 0) {
    for (i = increment; i < data.length; i++) {
      var j = i;
      var temp = data[i];
      while (j >= increment && data[j - increment] > temp) {
        data[j] = data[j - increment];
        j = j - increment;
      }
      data[j] = temp;
    }
    if (increment == 2) {
      increment = 1;
    } else {
      increment = parseInt((increment * 5) / 11);
    }
  }
  return data;
}
console.time("SHELLSORT");
setTimeout(() => shellSort(data), 1500);
console.timeEnd("SHELLSORT");

//LINEAR  WITH TIMING
function linearSearch(arr, num) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == num) {
      return i;
    }
  }
  return null;
}
console.time("LinearSearchIns");
setTimeout(() => linearSearch(insertionSort(data), 1787), 2000);
console.timeEnd("LinearSearchIns");
console.time("LinearSearchSh");
setTimeout(() => linearSearch(shellSort(data), 1787), 2000);
console.timeEnd("LinearSearchSh");

//BINARY SEARCH
function binarySearch(arr, num) {
  var lowIndex = 0;
  var highIndex = arr.length - 1;
  while (lowIndex <= highIndex) {
    var midIndex = Math.floor((lowIndex + highIndex) / 2);
    if (arr[midIndex] == num) {
      return midIndex;
    } else if (arr[midIndex] < num) {
      lowIndex = midIndex + 1;
    } else {
      highIndex = midIndex - 1;
    }
  }
  return null;
}
console.time("BinarySearchShell");
setTimeout(() => binarySearch(insertionSort(data), 1787), 2000);
console.timeEnd("BinarySearchShell");
console.time("BinarySearchInsert");
setTimeout(() => binarySearch(shellSort(data), 2438), 2000);
console.timeEnd("BinarySearchInsert");

setTimeout(() => {
  //declare sorted data
  let inSort = insertionSort(data);
  let shSort = shellSort(data);

  //Search for biggest number LINEAR
  console.time("LINEARSEARCH ON INSERTSORT");
  linearSearch(inSort, 999912);
  console.timeEnd("LINEARSEARCH ON INSERTSORT");
  console.time("LINEARSEARCH ON shellSORT");
  linearSearch(shSort, 999912);
  console.timeEnd("LINEARSEARCH ON shellSORT");
  //Search for biggest number LINEAR
  console.time("BINARYSEARCH ON INSERTSORT");
  binarySearch(inSort, 999912);
  console.timeEnd("BINARYSEARCH ON INSERTSORT");
  console.time("BINARYSEARCH ON shellSORT");
  binarySearch(shSort, 999912);
  console.timeEnd("BINARYSEARCH ON shellSORT");

  //search for every 1500 number linear(insertion)
  data.forEach((num, i) => {
    if (i % 1500 === 0) {
      console.time("1500LIN.INSERT");
      linearSearch(inSort, num);
      console.timeEnd("1500LIN.INSERT");
    }
  });
  //(shell)
  data.forEach((num, i) => {
    if (i % 1500 === 0) {
      console.time("1500LIN.SHELL");
      linearSearch(shSort, num);
      console.timeEnd("1500LIN.SHELL");
    }
  });

  //search for every 1500 number binary(insertion)
  data.forEach((num, i) => {
    if (i % 1500 === 0) {
      console.time("1500BIN.INSERT");
      binarySearch(inSort, num);
      console.timeEnd("1500BIN.INSERT");
    }
  });
  //(shell)
  data.forEach((num, i) => {
    if (i % 1500 === 0) {
      console.time("1500BIN.SHELL");
      binarySearch(shSort, num);
      console.timeEnd("1500BIN.SHELL");
    }
  });
}, 2000);
