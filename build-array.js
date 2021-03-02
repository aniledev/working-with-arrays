const memory = require("./memory");

// initialize the Array class
class Array {
  // add a constructor method to the class
  constructor() {
    // give the constructor three properties: length, capacity, and pointer
    this.length = 0;
    this.capacity = 0;
    this.pointer = memory.allocate(this.length);
  }

  // create a push method using to add item to the end of the array
  push(value) {
    /* if the array length is greater than the capacity, the memory blocks allocated, 
        then resize the array first using the size ratio*/
    if (this.length >= this.capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    /* then use the set method to set the value of the memory block at a pointer */
    this.set(this.pointer + this.length, value);
    // we've added a new value to the array, so the length needs to be incremented
    this.length++;
  }

  // create pop method used to remove items from the end of the array
  pop() {}

  // get method used to retrieve a value from a memory block
  get(index) {}

  // insert used to put in a value at a certain memory block in the array
  insert(index, value) {}

  // remove method used too remove a value from a certain memory block in the array
  remove(index) {}

  /* resize method is used to resize the array so that the capacity of the array in
    memory is always larger than the length of the array */
  _resize(size) {}
}

// triple the size of memory that is allocated
Array.SIZE_RATIO = 3;
