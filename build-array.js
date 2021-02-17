const memory = require("./memory");

class Array {
  // this would create an empty array with 0 "blocks of memory"
  constructor() {
    this.length = 0;
    // capacity indicates how many items you can hold without needing to resize
    this._capacity = 0;
    this.prt = memory.allocate(this.length);
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

    memory.copy(this.pointer, oldPointer, this.length);
    memory.free(oldPointer);
    this._capacity = size;
  }
    
    
    
}

// triple the size of memory that is allocated
Array.SIZE_RATIO = 3;
