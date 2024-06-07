import bucket_sort from "@code/BucketSort";

describe("bucket-sort", function () {
  test("empty array", function () {
    const arr: number[] = [];
    bucket_sort(arr);
    expect(arr).toEqual([]);
  });

  test("one element", function () {
    const arr: number[] = [0];
    bucket_sort(arr);
    expect(arr).toEqual([0]);
  });

  test("two elements", function () {
    const arr: number[] = [1, 0];
    bucket_sort(arr);
    expect(arr).toEqual([0, 1]);
  });

  test("array of items", function () {
    const arr = [1, 0, 0, 2, 1, 2, 2, 1, 0, 2];
    bucket_sort(arr);
    expect(arr).toEqual([0, 0, 0, 1, 1, 1, 2, 2, 2, 2]);
  });
});
