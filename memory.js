class Memory {
  constructor() {
    this.memory = new Float64Array(1024);
    this.head = 0;
  }

  /* reserves a contiguous block of memory consisting of size boxes which you 
  can safely modify, returning a pointer to the 1st box or null if the allocation fails */
  allocate(size) {
    if (this.head + size > this.memory.length) {
      return null;
    }

    let start = this.head;

    this.head += size;
    return start;
  }

  // frees the block of memory reserved using allocate
  free(pointer) {}

  /* copies size boxes of data from the from a pointer to an end pointer (for example, 
  copy(0, 10, 3) would copy the values from boxes 0, 1 and 2 to the boxes at 10, 11 and;
  12 respectively) */
  copy(fromIdx, toIdx, size) {
    if (fromIdx === toIdx) {
      return;
    }

    if (fromIdx > toIdx) {
      // Iterate forwards
      for (let i = 0; i < size; i++) {
        this.set(toIdx + i, this.get(fromIdx + i));
      }
    } else {
      // Iterate backwards
      for (let i = size - 1; i >= 0; i--) {
        this.set(toIdx + i, this.get(fromIdx + i));
      }
    }
  }

  // returns the value stored at a certain memory address
  get(pointer) {
    return this.memory[pointer];
  }

  // sets the value stored at a certain memory address
  set(pointer, value) {
    this.memory[pointer] = value;
  }
}

module.exports = Memory;
