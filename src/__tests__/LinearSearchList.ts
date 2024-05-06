import linear_fn from "@code/LinearSearchList";

describe("Linear search array", () => {
  it("should work for empty array", () => {
    expect(linear_fn([], 69)).toEqual(false);
  });

  it("should work for array with one element", () => {
    expect(linear_fn([78], 69)).toEqual(false);
    expect(linear_fn([78], 78)).toEqual(true);
  });

  it("should work for array with two elements", () => {
    expect(linear_fn([53, 78], 69)).toEqual(false);
    expect(linear_fn([78, 96], 78)).toEqual(true);
    expect(linear_fn([15, 78], 78)).toEqual(true);
  });

  it("should work for array with odd elements count", () => {
    const foo = [1, 69, 420, 1337, 71, 81, 90, 99, 69420, 3, 4];
    expect(linear_fn(foo, 69)).toEqual(true);
    expect(linear_fn(foo, 1336)).toEqual(false);
    expect(linear_fn(foo, 69420)).toEqual(true);
    expect(linear_fn(foo, 69421)).toEqual(false);
    expect(linear_fn(foo, 1)).toEqual(true);
    expect(linear_fn(foo, 0)).toEqual(false);
    expect(linear_fn(foo, 71)).toEqual(true);
    expect(linear_fn(foo, 81)).toEqual(true);
    expect(linear_fn(foo, 90)).toEqual(true);
  });

  it("should work for array with even elements count", () => {
    const foo = [1, 69, 420, 1337, 71, 81, 90, 99, 69420, 3, 4];
    expect(linear_fn(foo, 69)).toEqual(true);
    expect(linear_fn(foo, 1336)).toEqual(false);
    expect(linear_fn(foo, 69420)).toEqual(true);
    expect(linear_fn(foo, 69421)).toEqual(false);
    expect(linear_fn(foo, 1)).toEqual(true);
    expect(linear_fn(foo, 0)).toEqual(false);
    expect(linear_fn(foo, 81)).toEqual(true);
    expect(linear_fn(foo, 90)).toEqual(true);
  });
});
