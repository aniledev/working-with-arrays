import { Memory } from "./Memory";

class Array {
  // this would create an empty array with 0 "blocks of Memory"
  constructor() {
    this.length = 0;
    // capacity indicates how many items you can hold without needing to resize
    this._capacity = 0;
    this.pointer = Memory.allocate(this.length);
  }

  // push to end of array -- increase the amount of Memory blocks
  push(value) {
    // array should be capable of holding more than than it actually has; if Memory blocks >= capacity, then resize
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    // then set the value of the new Memory blocks
    Memory.set(this.pointer + this.length, value);

    this.length++;
  }

  _resize(size) {
    const oldPointer = this.pointer;
    this.pointer = Memory.allocate(size);

    if (this.pointer === null) {
      throw new Error("Out of Memory");
    }

    Memory.copy(oldPointer, this.pointer, this.length);
    Memory.free(oldPointer);
    this._capacity = size;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    return Memory.get(this.pointer + index);
  }

  pop() {
    if (this.length == 0) {
      throw new Error("Index error");
    }
    const value = Memory.get(this.pointer + this.length - 1);
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

    Memory.copy(
      this.pointer + index + 1,
      this.pointer + index,
      this.length - index
    );
    Memory.set(this.pointer + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    Memory.copy(
      this.pointer + index + 1,
      this.pointer + index,
      this.length - index - 1
    );
    this.length--;
  }
}
// triple the size of Memory that is allocated
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
