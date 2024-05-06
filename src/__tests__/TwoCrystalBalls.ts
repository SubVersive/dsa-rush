import two_crystal_balls from "@code/TwoCrystalBalls";

describe('Two crystal balls', () => {
  it('should work for empty array', () => {
    expect(two_crystal_balls([])).toEqual(-1);
  });

  it('should work for last item', () => {
    expect(two_crystal_balls([false, false, false, false, false, true])).toEqual(5);
    expect(two_crystal_balls([false, false, false, false, false, false, true])).toEqual(6);
  });

  it('should work for randomly generated array', () => {
    const idx = Math.floor(Math.random() * 10000);
    const data = new Array(10000).fill(false);

    for (let i = idx; i < 10000; ++i) {
      data[i] = true;
    }

    expect(two_crystal_balls(data)).toEqual(idx);
  });

  it('should work for all false case', () => {
    expect(two_crystal_balls(new Array(821).fill(false))).toEqual(-1);
  })

  it('should work for all true case', () => {
    expect(two_crystal_balls(new Array(821).fill(true))).toEqual(0);
  })
});
