"use strict";
const Memory = require("./memory");

const memory = new Memory();

// initialize the Array class
class Array {
  // add a constructor method to the class
  constructor() {
    // give the constructor three properties: length, _capacity, and pointer
    this.length = 0;
    this._capacity = 0;
    this.pointer = memory.allocate(this.length);
  }

  // create a push method using to add item to the end of the array
  push(value) {
    /* if the array length is greater than the _capacity, the memory blocks allocated, 
        then resize the array first using the size ratio*/
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    /* then use the set method to set the value of the memory block at a pointer */
    memory.set(this.pointer + this.length, value);
    // we've added a new value to the array, so the length needs to be incremented
    this.length++;
  }

  // create pop method used to remove items from the end of the array
  pop() {
    // if the array has a length of 0, no values return an error
    if (this.length === 0) {
      throw new Error("Index error.");
    }

    /* create a variable to hold the value of the last element in the array, 
        retried using memory.get */
    const value = this.get(this.pointer + this.length - 1);
    // decrement the length of the array since we are removing a value from the end
    this.length--;

    //return the value
    return value;
  }

  // get method used to retrieve a value from a memory block
  get(index) {
    // if the index value is not present in the array throw a new error
    if (index < 0 || index >= this.length) {
      throw new Error("Index error.");
    }
    // else use memory.get to retrieve a value
    return memory.get(this.pointer + index);
  }

  // insert used to put in a value at a certain memory block in the array
  insert(index, value) {
    // if the index is not part of the array, throw a new error
    if (index < 0 || index >= this.length) {
      throw new Error("Index error.");
    }

    // if the length of the array is greater than the _capacity in memory, then the array needs to be resized
    if (this.length >= this._capacity) {
      this._resize((this.pointer + this.length) * Array.SIZE_RATIO);
    }

    /* if a value in inserted in the array, the array needs to shifted down first by copying one chunk 
    to the new memory blocks */
    memory.copy(
      this.pointer + index, // fromInx -- > copying from the index after you insert the value into array
      this.pointer + index + 1, // toIdx -- > the index to which you are going to copy the new array chunk
      this.length - index // the number of values to copy over; from the index to the end of the array
    );

    // then the value can be inserted at the pointer index
    memory.set(this.pointer + index, value);

    // finally the length can be incremented because one new value was added to the array
    this.length++;
  }

  // remove method used too remove a value from a certain memory block in the array
  remove(index) {
    // if the index is not in the array length, throw a new error
    if (index < 0 || index >= this.length) {
      throw new Error("Index error.");
    }
    // use the memory.copy method to copy the new chunk of array down one to to the new index value
    memory.copy(
      this.pointer +
        index +
        1 /* removing the index values means that index above the index 
      value needs to be copied */,
      this.pointer +
        index /* once the value is removed, everything needs to be copied to the index 
      of the removed value */,
      this.length - index - 1 // the number of size blocks to copy
    );

    // decrement the length of the array because
    this.length--;
  }

  /* resize method is used to resize the array so that the _capacity of the array in
    memory is always larger than the length of the array; allocate a larger chunk of memory,
    copy from old chunk to new chunk, free the old chunk of memory */
  _resize(size) {
    // create a variable for the old pointer from where you're copying
    const oldPointer = this.pointer;
    /* create a variable for the new pointer to which you're copying; the new pointer  
        should point to the new memory blocks that you've allocated based on the size*/
    this.pointer = memory.allocate(size);

    // throw an error if this.pointer is null
    if (this.pointer === null) {
      throw new Error("Out of memory");
    }

    // copy to the new memory
    memory.copy(oldPointer, this.pointer, this.length);
    // free the old memory
    memory.free(oldPointer);

    // capacity of memory blocks redeclare as equal to size
    this._capacity = size;
  }
}

// triple the size of memory that is allocated
Array.SIZE_RATIO = 3;

/* 2. What is the length, _capacity and memory address of your array? 
length = 1
capacity = 3
pointer = 0
*/
function main() {
  Array.SIZE_RATIO = 3;

  // Create an instance of the Array class
  let arr = new Array();

  // Add an item to the array
  arr.push(3);
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);

  // length = 6, capacity = 12, pointer = 3

  console.log(arr);
}

main();

/* 5. Urlify a string
Input: tauhida parveen
Output: tauhida%20parveen*/

function urlString(string) {
  // declare a variable to hold the output
  let result = "";

  // loop through the string
  for (let i = 0; i < string.length; i++) {
    // check each character of the string, if the character is a space, then result = %20
    if (string[i] === " ") {
      result += "%20";
    } else {
      // else result = the value of the character at that index
      result += string[i];
    }
  }
  return console.log(result);
}
urlString("apple cart");

/* 6. Filtering an array. Remove all numbers less than 5. Remember filter does not mutate the 
original array .
Input: [1, 4, 5 ,6, 5, 7, 8, 10, 5, 15]
Output: [5 ,6, 5, 7, 8, 10, 5, 15] */

function lessThan5Filter(array) {
  // declare a new empty array to hold the result
  let result = [];

  // loop through the array and check each index value
  for (let i = 0; i < array.length; i++) {
    // if the index value is equal to or greater than 5, push it to the new array
    if (array[i] >= 5) {
      result.push(array[i]);
    }
  }
  return console.log(result);
}
lessThan5Filter([1, 4, 5, 6, 5, 7, 3, 8, 10, 4, 2, 3, 5, 15]);

/* 7. Max sum in the array
You are given an array containing positive and negative integers. Write an algorithm 
which will find the largest sum in a continuous sequence. */
function maxSum (array) {
  // declare a variable to hold the max sum
  // 
}
