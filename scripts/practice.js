const fs = require("fs");
const path = require("path");
const config = require("../ligma.config");
const dsa = require("./dsa");

const { create_class, create_function } = require('./generators');

const mode = process.argv[2];

const src_path = path.join(__dirname, "..", "src");

const solutions = `solutions`;
const solutions_path = path.join(src_path, solutions);
try {
  fs.unlinkSync(solutions_path);
} catch (e) {}
try {
  fs.mkdirSync(solutions_path);
} catch (e) {}

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

let problems;

if (!mode || !Number.isNaN(parseInt(mode, 10))) {
  const count = !mode ? 1 : parseInt(mode, 10);
  console.log({ count });
  problems = shuffle([...config.practice]).slice(0, count);
} else {
  problems = config.practice.filter((p) => p.toLowerCase().includes(mode.toLowerCase()));
}

problems.forEach((problem) => {
  console.log(`Selected ${problem} for practice`);
  const item = dsa[problem];
  if (!item) {
    throw new Error(`algorithm ${problem} could not be found`);
  }
  if (item.type === "class") {
    create_class(solutions_path, problem, item);
  } else {
    create_function(solutions_path, problem, item);
  }
});
fs.writeFileSync(path.join(__dirname, "..", "jest.tests.json"), JSON.stringify(problems, null, 2));

const align = require("./align-configs");
align.jest(solutions);
align.ts_config(solutions);
