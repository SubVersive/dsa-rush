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

function generate_class(name, item, isDefault, lines) {
  if (isDefault) {
    lines.push(`export default class ${name}${item.generic || ""} {`);
  } else {
    lines.push(`export class ${name}${item.generic || ""} {`);
  }
  lines.push(os.EOL);
  if (item.properties) {
    lines.push(item.properties.map(generate_property).join(os.EOL));
    lines.push(os.EOL);
    lines.push(os.EOL);
  }
  const constructorArguments = item.constructor?.args || "";
  lines.push(`  constructor(${constructorArguments}) {
  }`);
  lines.push(os.EOL);
  lines.push(os.EOL);
  if (item.methods) {
    lines.push(item.methods.map(generate_method).join(`${os.EOL}${os.EOL}`));
    lines.push(os.EOL);
  }
  lines.push('}')
}

function create_class(solutions_path, name, item) {
  const lines = [];
  
  (item.nested || []).forEach((ni) => {
    generate_class(ni.name, ni, false, lines);
    lines.push(os.EOL);
    lines.push(os.EOL);
  });

  generate_class(name, item, true, lines);

  fs.writeFileSync(
    path.join(solutions_path, `${name}.ts`),
    lines.join(''),
  );
}

function create_function(solutions_path, name, item) {
  const g = item.generic ? item.generic : "";
  const desc = item.description ? `// ${item.description}${os.EOL}` : "";
  fs.writeFileSync(
    path.join(solutions_path, `${name}.ts`),
    `${desc}export default function ${item.fn}${g}(${item.args}): ${item.return} {

}`,
  );
}

module.exports = {
  create_class,
  create_function,
}
