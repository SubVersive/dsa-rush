class ListNode<T> {
  public value: T;
  public next: ListNode<T> | null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export default class SinglyLinkedList<T> {
  public length: number;

  private head: ListNode<T> | null;
  private tail: ListNode<T> | null;

  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  prepend(item: T): void {
    if (!this.head) {
      this.head = this.tail = new ListNode(item);
      this.length++;
      return;
    }

    const newNode = new ListNode(item, this.head);
    this.head = newNode;
    this.length++;
  }

  insertAt(item: T, idx: number): void {
    if (!this.head) {
      this.head = this.tail = new ListNode(item);
      this.length++;
      return;
    }

    if (idx === 0) {
      const newNode = new ListNode(item, this.head);
      this.head = newNode;
      this.length++;
      return;
    }

    if (idx > this.length - 1) {
      const newNode = new ListNode(item);
      this.tail!.next = newNode;
      this.tail = this.tail!.next;
      this.length++;
      return;
    }

    let curIndex = 0;
    let cur = this.head;

    while (curIndex < idx - 1) {
      cur = cur.next!;
      curIndex++;
    }

    const newNode = new ListNode(item, cur.next);
    cur.next = newNode;
    this.length++;
  }

  append(item: T): void {
    if (!this.head) {
      this.head = this.tail = new ListNode(item);
      this.length++;
      return;
    }

    this.tail!.next = new ListNode(item);
    this.tail = this.tail!.next;

    this.length++;
  }

  remove(item: T): T | undefined {
    let prev = null;
    let cur = this.head;

    while (cur !== null && cur.value !== item) {
      prev = cur;
      cur = cur.next;
    }

    if (cur === null) {
      return undefined;
    }

    this.length--;
    if (prev === null) {
      this.head = cur.next;
      if (!this.head) {
        this.tail = null;
      }
      cur.next = null;
      return cur.value;
    } else {
      prev.next = cur.next;
      if (!prev.next) {
        this.tail = prev;
      }
      cur.next = null;
      return cur.value;
    }
  }

  get(idx: number): T | undefined {
    if (idx > this.length - 1) {
      return undefined;
    }
    let curIndex = 0;
    let cur = this.head;
    while (curIndex < idx) {
      curIndex++;
      cur = cur!.next;
    }

    return cur!.value;
  }

  removeAt(idx: number): T | undefined {
    if (idx > this.length - 1) {
      return undefined;
    }

    let toRemove;
    if (idx === 0) {
      toRemove = this.head;
      this.head = this.head!.next;
      if (!this.head) {
        this.tail = null;
      }
    } else {
      let curIndex = 0;
      let cur = this.head;
      while (curIndex < idx - 1) {
        cur = cur!.next;
        curIndex++;
      }
      toRemove = cur!.next;
      cur!.next = cur!.next!.next;
      if (idx === this.length - 1) {
        this.tail = cur;
      }
    }

    this.length--;
    toRemove!.next = null;
    return toRemove?.value;
  }
}
