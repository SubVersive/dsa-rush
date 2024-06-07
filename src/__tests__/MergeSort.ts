import merge_sort from "@code/MergeSort";

describe("merge-sort", function () {
  test("empty array", function () {
    const arr: number[] = [];
    merge_sort(arr);
    expect(arr).toEqual([]);
  });

  test("one element", function () {
    const arr: number[] = [23];
    merge_sort(arr);
    expect(arr).toEqual([23]);
  });

  test("two elements", function () {
    const arr: number[] = [23, 6];
    merge_sort(arr);
    expect(arr).toEqual([6, 23]);
  });

  test("array of items", function () {
    const arr = [9, 3, 7, 4, 69, 420, 42];
    merge_sort(arr);
    expect(arr).toEqual([3, 4, 7, 9, 42, 69, 420]);
  });

  test("array with negative items", function () {
    const arr = [9, 3, 7, -4, 69, -420, 42];
    merge_sort(arr);
    expect(arr).toEqual([-420, -4, 3, 7, 9, 42, 69]);
  });
});
