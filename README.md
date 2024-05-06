## Traing DSA

### How It Works

Make sure you have [Node.js](https://nodejs.org/en/)

clone the repo and install the dependencies

```bash
npm ci
```

edit the `ligma.config.js` file
```javascript
module.exports = {
  practice: [
      ... // add items which you want to practice
  ],
  dsa: [
      "InsertionSort",
      "MergeSort",
      "Queue",
      "Stack",
      "QuickSort",
      "DijkstraList",
      "PrimsList",
  ],
}
```

Start practicing
```bash
npm run practice # one random item from the practice list
npm run practice 5 # five random item from the practice list
npm run practice bubblesort # practice specific item
npm run practice sort # practice all items wich includes *sort* in name
```


### TODO
- improve tests for singly linked list
- improve tests for queue