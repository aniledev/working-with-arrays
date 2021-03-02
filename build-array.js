const memory = require("./memory");

// intialize the Array class
class Array {
  // add a constructor method to the class
  constructor() {
    // give the constructor three properties: length, capacity, and pointer
    this.length = 0;
    this.capacity = 0;
    this.pointer = memory.allocate(this.length);
  }
}

// triple the size of memory that is allocated
Array.SIZE_RATIO = 3;
