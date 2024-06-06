import fs from 'fs';
import os from 'os';
import path from 'path';
import UnionFind from "@code/UFQuickUnion";
import UFQuickUnion from '@code/UFQuickUnion';

describe("Union Find: Quick Union", function () {
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

  it('should return proper sets count', () => {
    const uf = new UnionFind(10);
    expect(uf.setsCount()).toBe(10);
    uf.union(0, 5);
    expect(uf.count()).toBe(10);
    expect(uf.setsCount()).toBe(9);
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

  describe('integration tests', () => {
    const runTest = (filename: string, timeout: number) => {
      const small = fs.readFileSync(path.join(__dirname, 'test_data', filename), 'utf8');
      const lines = small.split(os.EOL);
      const n = parseInt(lines[0], 10);
      const start = process.hrtime();
      const uf = new UFQuickUnion(n);
      let idx = 2;
      while (lines[idx] !== 'isConnected') {
        const [p, q] = lines[idx].split(' ').map(v => parseInt(v, 10));
        uf.union(p, q);
        idx++;
        if (idx % 1000 === 0) {
          fs.appendFileSync('progress.txt', `isConnected: ${idx}`);
        }
      }

      

      let connections = [];
      for (let i = 0; i < uf.count(); i++) {
        for (let j = i + 1; j < uf.count(); j++) {
          if (Math.random() < 0.5) {
            connections.push(`${i} ${j} ${uf.isConnected(i, j)}`);
          } else {
            connections.push(`${j} ${i} ${uf.isConnected(i, j)}`);
          }
          if (j % 1000 === 0) {
            fs.appendFileSync('progress.txt', `connections: ${i}:${j}`);
          }
        }
      }

      function shuffle(array: any[]) {
        let currentIndex = array.length;
        
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
          
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];

          if (currentIndex % 1000 === 0) {
            fs.appendFileSync('progress.txt', `shuffle: ${currentIndex}`);
          }
        }
      }

      shuffle(connections);
      fs.appendFileSync(path.join(__dirname, 'test_data', filename), connections.slice(0, idx).join(os.EOL));


      idx++;
      while (idx < lines.length && lines[idx] !== '') {
        const [ps, qs, rs] = lines[idx].split(' ');
        const p = parseInt(ps, 10);
        const q = parseInt(qs, 10);
        const expected = rs === 'true';
        expect(uf.isConnected(p, q)).toBe(expected);
        idx++;
      }
      const elapsed = process.hrtime(start)[1] / 1000000;
      expect(elapsed).toBeLessThan(timeout);
    }

    it('should work for tiny set', () => {
      runTest('tinyUF.txt', 10);
    });

    it('should work for medium set', () => {
      runTest('mediumUF.txt', 100);
    });

    it.only('should work for large set', () => {
      runTest('largeUF.txt', 1000);
    });
  });
});
