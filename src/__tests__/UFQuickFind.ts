import UnionFind from "@code/UFQuickFind";

describe("Union Find: Quick Find", function () {
  it('should not work for less than 2 items', () => {
    expect(() => new UnionFind(0)).toThrow();
    expect(() => new UnionFind(1)).toThrow();
  });

  it('should check for out of bounds', () => {
    const uf = new UnionFind(5);
    expect(() => uf.isConnected(1, -1)).toThrow();
    expect(() => uf.isConnected(-1, 1)).toThrow();
    expect(() => uf.isConnected(1, 10)).toThrow();
    expect(() => uf.isConnected(10, 1)).toThrow();

    expect(() => uf.union(1, -1)).toThrow();
    expect(() => uf.union(-1, 1)).toThrow();
    expect(() => uf.union(1, 10)).toThrow();
    expect(() => uf.union(10, 1)).toThrow();
  });

  it('should properly initialize', () => {
    const uf = new UnionFind(10);
    expect(uf.count()).toBe(10);
    for (let i = 0; i < uf.count(); i++) {
      expect(uf.find(i)).toBe(i);
    }
  });

  it('should rewrite link', () => {
    const uf = new UnionFind(10);

    uf.union(0, 5);
    
    const found = uf.find(0) === 5 || uf.find(5) === 0;
    expect(found).toBeTruthy();
  });

  it('should become true with direct connection', () => {
    const uf = new UnionFind(10);

    expect(uf.isConnected(0, 5)).toBeFalsy();
    expect(uf.isConnected(5, 0)).toBeFalsy();

    uf.union(0, 5);

    expect(uf.isConnected(0, 5)).toBeTruthy();
    expect(uf.isConnected(5, 0)).toBeTruthy();
    expect(uf.isConnected(5, 1)).toBeFalsy();
    expect(uf.isConnected(0, 1)).toBeFalsy();
  });

  it('should become true with indirect connection', () => {
    const uf = new UnionFind(10);

    expect(uf.isConnected(0, 5)).toBeFalsy();
    expect(uf.isConnected(5, 0)).toBeFalsy();

    uf.union(0, 3);
    uf.union(3, 9);
    uf.union(5, 9);

    expect(uf.isConnected(0, 5)).toBeTruthy();
    expect(uf.isConnected(5, 0)).toBeTruthy();
    expect(uf.isConnected(5, 1)).toBeFalsy();
    expect(uf.isConnected(0, 1)).toBeFalsy();
  });

});
