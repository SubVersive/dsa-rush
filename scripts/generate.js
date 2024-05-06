const fs = require("fs");
const path = require("path");
const config = require("../ligma.config");
const dsa = require("./dsa");

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

function generate_method(method) {
  return `${method.name}(${method.args || ""}): ${method.return || "void"} {

}`;
}

function generate_property(prop) {
  return `${prop.scope} ${prop.name}: ${prop.type};`;
}

function generate_getter(getter) {
  return `get ${getter.name}(): ${getter.return} {
    return this.${getter.prop_name};
}`;
}

function create_class(name, item) {
  fs.writeFileSync(
    path.join(solutions_path, `${name}.ts`),
    `export default class ${name}${item.generic || ""} {
    ${(item.properties || []).map(generate_property).join("\n    ")}

    ${(item.getters || []).map(generate_getter).join("\n    ")}

    constructor() {
    }

    ${(item.methods || []).map(generate_method).join("\n    ")}
}`,
  );
}

function create_function(name, item) {
  const g = item.generic ? item.generic : "";
  fs.writeFileSync(
    path.join(solutions_path, `${name}.ts`),
    `export default function ${item.fn}${g}(${item.args}): ${item.return} {

}`,
  );
}

config.dsa.forEach((ds) => {
  const item = dsa[ds];
  if (!item) {
    throw new Error(`algorithm ${ds} could not be found`);
  }
  if (item.type === "class") {
    create_class(ds, item);
  } else {
    create_function(ds, item);
  }
});

const align = require("./align-configs");
align.jest(solutions);
align.ts_config(solutions);
align.package_json(config, relative_solutions_path);
