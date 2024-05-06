const fs = require("fs");
const path = require("path");
const config = require("../ligma.config");
const dsa = require("./dsa");

const { create_class, create_function } = require('./generators');

const src_path = path.join(__dirname, "..", "src");

const solutions = `solutions`;
const solutions_path = path.join(src_path, solutions);
const relative_solutions_path = path.relative(process.cwd(), solutions_path);
try {
  fs.unlinkSync(solutions_path);
} catch (e) {}
try {
  fs.mkdirSync(solutions_path);
} catch (e) {}

config.dsa.forEach((ds) => {
  const item = dsa[ds];
  if (!item) {
    throw new Error(`algorithm ${ds} could not be found`);
  }
  if (item.type === "class") {
    create_class(solutions_path, ds, item);
  } else {
    create_function(solutions_path, ds, item);
  }
});

const align = require("./align-configs");
align.jest(solutions);
align.ts_config(solutions);
align.package_json(config, relative_solutions_path);
