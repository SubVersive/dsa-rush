import BinarySearchTree, { Node }  from "@code/BinarySearchTree";

describe("Binary search tree", () => {

  const compare = (bst: BinarySearchTree<number>, target: number[]): boolean => {
    const values: number[] = [];

    const dfs = (node: Node<number> | null) => {
      if (!node) {
        return;
      }

      dfs(node.left);
      values.push(node.value);
      dfs(node.right);
    }

    dfs(bst.getRoot());

    if (values.length !== target.length) {
      return false;
    }

    for (let i = 0; i < values.length; i++) {
      if (values[i] !== target[i]) {
        return false;
      }
    }

    return true;
  }

  describe("initialization", () => {
    it('should be initialized as empty by default', () => {
      const bst = new BinarySearchTree<number>();
      expect(bst.getRoot()).toBeNull();
      expect(compare(bst, [])).toBeTruthy();
    });
  });

  describe("insert a value", () => {
    it('should insert value as a root', () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(2);
      expect(bst.getRoot()).not.toBeNull();
      expect(bst.getRoot()!.value).toEqual(2);
      expect(compare(bst, [2])).toBeTruthy();
    });
  });
});
