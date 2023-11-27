function arrayFunction() {
    const array = [1, 2, 3, 4, 5];

    // Loop
    for (let i = 0; i < array.length; i++) {
        // operation
        break;
    }

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        // operation
        continue;
    }

    let j = 0;
    while (j < array.length) {
        const element = array[j];
        // operation
        j++;
    }

    // Get
    const value = array[2];

    // Set
    array[2] = 10;

    // Check Existence
    const exists = array.includes(3);
}

function listFunction() {
    const list = [1, 2, 3, 4, 5];

    // Loop
    for (const item of list) {
        // operation
        break;
    }

    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        // operation
        continue;
    }

    let j = 0;
    while (j < list.length) {
        const element = list[j];
        // operation
        j++;
    }

    // Add
    list.push(6);

    // Remove
    const index = list.indexOf(3);
    if (index !== -1) {
        list.splice(index, 1);
    }

    // Get
    const elem = list[2];

    // Set
    list[2] = 10;

    // Check Existence
    const exists = list.includes(4);
}

function dictionaryFunction() {
    const dictionary = {};

    // Add
    dictionary["one"] = 1;

    // Get
    const value = dictionary["one"];

    // Remove
    delete dictionary["one"];

    // Loop
    for (const key in dictionary) {
        if (dictionary.hasOwnProperty(key)) {
            const value = dictionary[key];
            // operation
            break;
        }
    }

    const keys = Object.keys(dictionary);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const v = dictionary[key];
        // operation
        continue;
    }

    let j = 0;
    while (j < keys.length) {
        const key = keys[j];
        const v = dictionary[key];
        // operation
        j++;
    }

    // Set
    dictionary["two"] = 20;

    // Check Existence
    const exists = dictionary.hasOwnProperty("two");
}

function hashSetFunction() {
    const hashSet = new Set([1, 2, 3, 4, 5]);

    // Loop
    for (const item of hashSet) {
        // operation
        break;
    }

    // Convert the set to an array
    const arrayFromHashSet = [...hashSet];

    // Loop with for
    for (let i = 0; i < arrayFromHashSet.length; i++) {
        const element = arrayFromHashSet[i];
        // operation
        continue;
    }

    const iterator = hashSet.values();
    let next = iterator.next();

    while (!next.done) {
        const element = next.value;
        // operation
        next = iterator.next();
    }

    // Add
    hashSet.add(6);

    // Remove
    hashSet.delete(3);

    // Check Existence
    const exists = hashSet.has(4);
}

function queueFunction() {
    const queue = [];

    // Enqueue
    queue.push(1);
    queue.push(2);
    queue.push(3);

    // Dequeue
    const dequeuedItem = queue.shift(); // Removes and returns the first item

    // Peek
    const frontItem = queue[0]; // Returns the first item without removing it

    // Loop
    for (const item of queue) {
        // operation
        break;
    }

    const count = queue.length;
    for (let i = 0; i < count; i++) {
        const element = queue.shift();
        // operation
        continue;
    }

    while (queue.length > 0) {
        const element = queue.shift();
        // operation
    }

    // Check Existence
    const exists = queue.includes(2);
}

function stackFunction() {
    const stack = [];

    // Push
    stack.push(1);
    stack.push(2);
    stack.push(3);

    // Pop
    const poppedItem = stack.pop(); // Removes and returns the top item

    // Peek
    const topItem = stack[stack.length - 1]; // Returns the top item without removing it

    // Loop
    for (const item of stack) {
        // operation
        break;
    }

    const count = stack.length;
    for (let i = 0; i < count; i++) {
        const element = stack.pop();
        // operation
        continue;
    }

    while (stack.length > 0) {
        const element = stack.pop();
        // operation
    }

    // Check Existence
    const exists = stack.includes(2);
}

function linkedListFunction() {
    const linkedList = [];

    // Add
    linkedList.push(1);
    linkedList.push(2);

    // Remove
    const index = linkedList.indexOf(1);
    if (index !== -1) {
        linkedList.splice(index, 1);
    }

    // Loop
    for (const item of linkedList) {
        // operation
        break;
    }

    let first = 0;
    while (first < linkedList.length) {
        const element = linkedList[first];
        // operation
        continue;
        first++;
    }

    // Get First Element
    const elem = linkedList[0];

    // Set a Specific Element
    const n = linkedList.indexOf(2);
    if (n !== -1) {
        linkedList[n] = 20;
    }

    // Check Existence
    const exists = linkedList.includes(2);
}
