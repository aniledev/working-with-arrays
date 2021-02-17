const memory = require("./memory");

class Array {
  // this would create an empty array with 0 "blocks of memory"
  constructor() {
    this.length = 0;
    this.prt = memory.allocate(this.length);
  }

  // push to end of array -- increase the amount of memory blocks
  push(value) {
    this._resize(this.length + 1);
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
    memory.copy(this.pointer, oldPointer, this.length);
    memory.free(oldPointer);
  }
}
