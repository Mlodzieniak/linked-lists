const node = (newValue) => {
  let value = null;
  let nextNode = null;
  if (newValue) {
    value = newValue;
  }
  return {
    get value() {
      return value;
    },
    set value(newestValue) {
      value = newestValue;
    },
    get nextNode() {
      return nextNode;
    },
    set nextNode(newNode) {
      nextNode = newNode;
    },
  };
};

const linkedList = (firstNodeValue) => {
  let head = node(firstNodeValue);

  return {
    append: (value, list = head) => {
      if (list.nextNode !== null) {
        linkedList().append(value, list.nextNode);
      } else {
        list.nextNode = node(value);
      }
    },
    prepend: (value) => {
      const newHead = node(value);
      newHead.nextNode = head;
      head = newHead;
    },
    size: (list = head, size = 0) => {
      size++;
      if (list.nextNode === null) {
        return size;
      }
      return linkedList().size(list.nextNode, size);
    },
    head: () => head.value,
    tail: (list = head) => {
      if (list.nextNode === null) {
        return list.value;
      }
      return linkedList().tail(list.nextNode);
    },
    at: (index, count = 0, list = head) => {
      if (index === count) {
        return list.value;
      }
      if (list.nextNode === null) {
        return "Index exceeds list size.";
      }
      return linkedList().at(index, ++count, list.nextNode);
    },
    pop: (list = head) => {
      if (list.nextNode.nextNode === null) {
        list.nextNode = null;
        return;
      }
      linkedList().pop(list.nextNode);
    },
    contains: (searchedValue, list = head) => {
      if (list.value === searchedValue) {
        return true;
      }
      if (list.nextNode === null) {
        return false;
      }
      return linkedList().contains(searchedValue, list.nextNode);
    },
    find: (searchedValue, index = 0, list = head) => {
      if (list.value === searchedValue) {
        return index;
      }
      if (list.nextNode === null) {
        return null;
      }
      return linkedList().find(searchedValue, ++index, list.nextNode);
    },
    toString: (list = head, string = "") => {
      string += `(${list.value}) -> `;
      if (list.nextNode === null) {
        string += "null";
        return string;
      }
      return linkedList().toString(list.nextNode, string);
    },
    insertAt: (value, index, currIndex = 0, list = head) => {
      if (index === 0) {
        const newHead = node(value);
        newHead.nextNode = head;
        head = newHead;
      } else if (list.nextNode === null) {
        list.nextNode = node(value);
      } else if (currIndex + 1 === index) {
        const rest = list.nextNode;
        list.nextNode = node(value);
        list.nextNode.nextNode = rest;
      } else {
        linkedList().insertAt(value, index, ++currIndex, list.nextNode);
      }
    },
    removeAt: (index, currIndex = 0, list = head) => {
      if (index === 0) {
        const newHead = head.nextNode;
        head = newHead;
      } else if (list.nextNode.nextNode === null && currIndex + 1 === index) {
        list.nextNode = null;
      } else if (currIndex + 1 === index) {
        const rest = list.nextNode.nextNode;
        list.nextNode = rest;
      } else {
        linkedList().removeAt(index, ++currIndex, list.nextNode);
      }
    },
  };
};
