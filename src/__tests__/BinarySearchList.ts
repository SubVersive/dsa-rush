import binary_fn from "@code/BinarySearchList";

describe("Binary search array", () => {
  it("should work for empty array", () => {
    expect(binary_fn([], 69)).toEqual(false);
  });

  it("should work for array with one element", () => {
    expect(binary_fn([78], 69)).toEqual(false);
    expect(binary_fn([78], 78)).toEqual(true);
  });

  it("should work for array with two elements", () => {
    expect(binary_fn([53, 78], 69)).toEqual(false);
    expect(binary_fn([78, 96], 78)).toEqual(true);
    expect(binary_fn([15, 78], 78)).toEqual(true);
  });

  it("should work for array with odd elements count", () => {
    const foo = [1, 3, 4, 69, 71, 81, 90, 99, 420, 1337, 69420];
    expect(binary_fn(foo, 69)).toEqual(true);
    expect(binary_fn(foo, 1336)).toEqual(false);
    expect(binary_fn(foo, 69420)).toEqual(true);
    expect(binary_fn(foo, 69421)).toEqual(false);
    expect(binary_fn(foo, 1)).toEqual(true);
    expect(binary_fn(foo, 0)).toEqual(false);
    expect(binary_fn(foo, 71)).toEqual(true);
    expect(binary_fn(foo, 81)).toEqual(true);
    expect(binary_fn(foo, 90)).toEqual(true);
  });

  it("should work for array with even elements count", () => {
    const foo = [1, 3, 4, 69, 71, 81, 90, 420, 1337, 69420];
    expect(binary_fn(foo, 69)).toEqual(true);
    expect(binary_fn(foo, 1336)).toEqual(false);
    expect(binary_fn(foo, 69420)).toEqual(true);
    expect(binary_fn(foo, 69421)).toEqual(false);
    expect(binary_fn(foo, 1)).toEqual(true);
    expect(binary_fn(foo, 0)).toEqual(false);
    expect(binary_fn(foo, 81)).toEqual(true);
    expect(binary_fn(foo, 90)).toEqual(true);
  });
});
