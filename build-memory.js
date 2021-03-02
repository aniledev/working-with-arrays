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
  // this would return undefined meaning that no value is set at that pointer index

  free(pointer) {}

  /* the copy() method is used to copy a specific number of boxes from one index to another 
  index */
  copy(fromIdx, toIdx, size) {
    /* if the index from which your're trying to copy is strictly equal to the index you're 
    trying to copy to, then return undefined */
    if (fromIdx === toIdx) {
      return;
    }
    /* if the index from which you're trying to copy is greater than the index to which 
    you're trying to copy, then use a for loop to loop through the size iterating forward*/
    if (fromIdx > toIdx) {
      for (let i = 0; i < size; i++) {
        /* use the set() method to set the pointer parameter to be the toIdx, and set the value to 
      using the get() method and the value of the fromIdx */
        this.set(toIdx + i, this.get(fromIdx + i));
      }
    } else {
      /* else if the fromIdx is not greater than the toIdx, then iterate backwards using a for let loop */
      for (let i = size - 1; i >= 0; i--) {
        /* use the set() and the get() method as a parameter to copy over the values*/
        this.set(toIdx + i, this.get(fromIdx + i));
      }
    }
  }
}