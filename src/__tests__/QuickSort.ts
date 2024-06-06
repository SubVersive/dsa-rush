import quick_sort from "@code/QuickSort";

describe("bubble-sort", function () {
  test("empty array", function () {
    const arr: number[] = [];
    quick_sort(arr);
    expect(arr).toEqual([]);
  });

  test("one element", function () {
    const arr: number[] = [23];
    quick_sort(arr);
    expect(arr).toEqual([23]);
  });

  test("two elements", function () {
    const arr: number[] = [23, 6];
    quick_sort(arr);
    expect(arr).toEqual([6, 23]);
  });

  test("array of items", function () {
    const arr = [9, 3, 7, 4, 69, 420, 42];
    quick_sort(arr);
    expect(arr).toEqual([3, 4, 7, 9, 42, 69, 420]);
  });

  test("array with negative items", function () {
    const arr = [9, 3, 7, -4, 69, -420, 42];
    quick_sort(arr);
    expect(arr).toEqual([-420, -4, 3, 7, 9, 42, 69]);
  });
});
