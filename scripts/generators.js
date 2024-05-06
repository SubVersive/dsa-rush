const os = require("os");
const fs = require("fs");
const path = require("path");

function generate_method(method) {
  return `  ${method.name}(${method.args || ""}): ${method.return || "void"} {

  }`;
}

function generate_property(prop) {
  return `  ${prop.scope} ${prop.name}: ${prop.type};`;
}

function create_class(solutions_path, name, item) {
  const lines = [];
  lines.push(`export default class ${name}${item.generic || ""} {`);
  lines.push(os.EOL);
  if (item.properties) {
    lines.push(item.properties.map(generate_property).join(os.EOL));
    lines.push(os.EOL);
    lines.push(os.EOL);
  }
  lines.push(`  constructor() {
  }`);
  lines.push(os.EOL);
  lines.push(os.EOL);
  if (item.methods) {
    lines.push(item.methods.map(generate_method).join(`${os.EOL}${os.EOL}`));
    lines.push(os.EOL);
  }
  lines.push('}')
  fs.writeFileSync(
    path.join(solutions_path, `${name}.ts`),
    lines.join(''),
  );
}

function create_function(solutions_path, name, item) {
  const g = item.generic ? item.generic : "";
  fs.writeFileSync(
    path.join(solutions_path, `${name}.ts`),
    `export default function ${item.fn}${g}(${item.args}): ${item.return} {

}`,
  );
}

module.exports = {
  create_class,
  create_function,
}