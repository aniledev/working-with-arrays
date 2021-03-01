// initialize a Memory class
class Memory {
  /* write constructor method for constructing new objects from the class; the constructor method 
    should have 2 properties: memory and head set to a value of 0  */
  constructor() {
    this.memory = new Float64Array(1024);
    this.head = 0;
  }

  /* when creating an array, a contiguous block of memory must be created or 
    reserved; this method can be declared as allocate and takes a size parameter*/
  allocate(size) {
    /* if the size of the memory blocks you want to reserve is greater than what 
    is in the memory, then return null */
    if (this.head + size > this.memory.length) {
      return null;
    }
    /* initialize a start variable set to this.head */
    let start = this.head;
    /* redeclare this.head to be equal to the size parameter */
    this.head += size;
    /* return a pointer to the first memory box*/
    return start;
  }

  /* the set method, which takes a value and pointer parameter, is used to set the 
    value stored at a certain memory block */
  set(pointer, value) {
    /* access the memory array at the pointer index and set the value equal to the 
    value parameter */
    this.memory[pointer] = value;
  }

  /* the get() method is used to retrieve a value stored at a certain memory block using 
    a pointer parameter */
  get(pointer) {
    // access the value at the pointer index in the memory array and return it
    return this.memory[pointer];
  }

  /* the free() method is used to free up a block of memory that was reserved using 
    the allocate method */
    free (pointer) { }
    // this would return undefined meaning that no value is set at that pointer index

  // the copy() method is used to copy a specific number of boxes
  copy() {}
}

//
