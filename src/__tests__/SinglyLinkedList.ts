import SinglyLinkedList from "@code/SinglyLinkedList";

describe("Singly Linked List", function () {
	it('should have length as 0 at the beginninb', () => {
		const list = new SinglyLinkedList<number>();
		expect(list.length).toBe(0);
		expect(list.get(0)).toBeUndefined();
	});

	it('appending items should increase the length', () => {
		const list = new SinglyLinkedList<number>();
		list.append(1);
		list.append(2);
		expect(list.length).toBe(2);
	});
	
	it('getting item by index after append', () => {
		const list = new SinglyLinkedList<number>();
		list.append(1);
		list.append(2);
		list.append(3);
		expect(list.get(0)).toBe(1);
		expect(list.get(1)).toBe(2);
		expect(list.get(2)).toBe(3);
		expect(list.get(6)).toBeUndefined();
	});
	
	it('should be possible to removeAt item by index', () => {
		const list = new SinglyLinkedList<number>();
		expect(list.removeAt(0)).toBeUndefined();
		list.append(1);
		list.append(2);
		list.append(3);

	  expect(list.removeAt(1)).toBe(2);		
	  expect(list.length).toBe(2);		
	  expect(list.get(0)).toBe(1);		
	  expect(list.get(1)).toBe(3);		
	  expect(list.get(2)).toBeUndefined();		
	});

	it('should be possible to removeAt head', () => {
		const list = new SinglyLinkedList<number>();
		list.append(1);
		list.append(2);
		list.append(3);

	  expect(list.removeAt(0)).toBe(1);		
	  expect(list.length).toBe(2);		
	  expect(list.get(0)).toBe(2);		
	  expect(list.get(1)).toBe(3);		
	  expect(list.get(2)).toBeUndefined();	
	});

	it('should be possible to removeAt tail', () => {
		const list = new SinglyLinkedList<number>();
		list.append(1);
		list.append(2);
		list.append(3);

	  expect(list.removeAt(2)).toBe(3);		
	  expect(list.length).toBe(2);		
	  expect(list.get(0)).toBe(1);		
	  expect(list.get(1)).toBe(2);		
	  expect(list.get(2)).toBeUndefined();	
	});

	it('preprending items should increase the length', () => {
		const list = new SinglyLinkedList<number>();
		list.prepend(1);
		list.prepend(2);
		expect(list.length).toBe(2);
	});
	
	it('getting item by index after prepend', () => {
		const list = new SinglyLinkedList<number>();
		list.prepend(1);
		list.prepend(2);
		list.prepend(3);
		expect(list.get(0)).toBe(3);
		expect(list.get(1)).toBe(2);
		expect(list.get(2)).toBe(1);
		expect(list.get(6)).toBeUndefined();
	});
	
	it('should be possible to remove item', () => {
		const list = new SinglyLinkedList<number>();
		expect(list.removeAt(0)).toBeUndefined();
		list.append(1);
		list.append(2);
		list.append(3);

	  expect(list.remove(2)).toBe(2);		
	  expect(list.length).toBe(2);		
	  expect(list.get(0)).toBe(1);		
	  expect(list.get(1)).toBe(3);		
	  expect(list.get(2)).toBeUndefined();		
	});

	it('should be possible to remove head', () => {
		const list = new SinglyLinkedList<number>();
		list.append(1);
		list.append(2);
		list.append(3);

	  expect(list.removeAt(0)).toBe(1);		
	  expect(list.length).toBe(2);		
	  expect(list.get(0)).toBe(2);		
	  expect(list.get(1)).toBe(3);		
	  expect(list.get(2)).toBeUndefined();	
	});

	it('should be possible to remove tail', () => {
		const list = new SinglyLinkedList<number>();
		list.append(1);
		list.append(2);
		list.append(3);

	  expect(list.removeAt(2)).toBe(3);		
	  expect(list.length).toBe(2);		
	  expect(list.get(0)).toBe(1);		
	  expect(list.get(1)).toBe(2);		
	  expect(list.get(2)).toBeUndefined();	
	});

	it('inserAt should increase the length', () => {
		const list = new SinglyLinkedList<number>();
		list.insertAt(0, 1);
		list.insertAt(1, 2);
		expect(list.length).toBe(2);
	});
	
	it('insertAt should be possible in the middle', () => {
		const list = new SinglyLinkedList<number>();
		list.append(1);
		list.append(2);
		list.append(3);
		list.insertAt(7, 1);
		expect(list.length).toBe(4);
		expect(list.get(0)).toBe(1);
		expect(list.get(1)).toBe(7);
		expect(list.get(2)).toBe(2);
	});

	it('insertAt should be possible in the beginning', () => {
		const list = new SinglyLinkedList<number>();
		list.append(1);
		list.append(2);
		list.append(3);
		list.insertAt(7, 0);
		expect(list.length).toBe(4);
		expect(list.get(0)).toBe(7);
		expect(list.get(1)).toBe(1);
	});

	it('insertAt should be possible in the end', () => {
		const list = new SinglyLinkedList<number>();
		list.append(1);
		list.append(2);
		list.append(3);
		list.insertAt(7, 2);
		expect(list.length).toBe(4);
		expect(list.get(2)).toBe(7);
		expect(list.get(3)).toBe(3);
	});

	it('should pass complex test', () => {
		const list = new SinglyLinkedList<number>();
		list.append(5);
		list.append(7);
		list.append(9);

		expect(list.get(2)).toEqual(9);
		expect(list.removeAt(1)).toEqual(7);
		expect(list.length).toEqual(2);

		list.append(11);
		expect(list.removeAt(1)).toEqual(9);
		expect(list.remove(9)).toEqual(undefined);
		expect(list.removeAt(0)).toEqual(5);
		expect(list.removeAt(0)).toEqual(11);
		expect(list.length).toEqual(0);

		list.prepend(5);
		list.prepend(7);
		list.insertAt(3, 1);
		list.prepend(9);

		expect(list.get(2)).toEqual(3);
		expect(list.get(0)).toEqual(9);
		expect(list.remove(9)).toEqual(9);
		expect(list.length).toEqual(3);
		expect(list.get(0)).toEqual(7);
	});
});
