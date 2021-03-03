"use strict";
const Memory = require("./memory");

const memory = new Memory();

class Array {
  // this would create an empty array with 0 "blocks of memory"
  constructor() {
    this.length = 0;
    // capacity indicates how many items you can hold without needing to resize
    this._capacity = 0;
    this.pointer = memory.allocate(this.length);
  }

  // push to end of array -- increase the amount of memory blocks
  push(value) {
    // array should be capable of holding more than than it actually has; if memory blocks >= capacity, then resize
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    // then set the value of the new memory blocks
    memory.set(this.pointer + this.length, value);

    this.length++;
  }

  _resize(size) {
    const oldPointer = this.pointer;
    this.pointer = memory.allocate(size);

    if (this.pointer === null) {
      throw new Error("Out of memory");
    }

    memory.copy(oldPointer, this.pointer, this.length);
    memory.free(oldPointer);
    this._capacity = size;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    return memory.get(this.pointer + index);
  }

  pop() {
    if (this.length == 0) {
      throw new Error("Index error");
    }
    const value = memory.get(this.pointer + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.copy(
      this.pointer + index + 1,
      this.pointer + index,
      this.length - index
    );
    memory.set(this.pointer + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    memory.copy(
      this.pointer + index + 1,
      this.pointer + index,
      this.length - index - 1
    );
    this.length--;
  }
}
// triple the size of memory that is allocated
Array.SIZE_RATIO = 3;

function main() {
  Array.SIZE_RATIO = 3;

  // Create an instance of the Array class
  let arr = new Array();

  // Add an item to the array
  arr.push(3);

  console.log(arr);
}

main();
