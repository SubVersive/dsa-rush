const fs = require("fs");
const path = require("path");

module.exports.package_json = function (config, solutions_path, ds) {
  const package_json = require("../package.json");
  package_json.scripts.solutions = `echo ${solutions_path}`;

  if (ds) {
    package_json.scripts.test = `jest ${ds}`;
  } else {
    package_json.scripts.test = `jest --`;
  }

  fs.writeFileSync(path.join(__dirname, "..", "package.json"), JSON.stringify(package_json, null, 4));
};

module.exports.ts_config = function (set_to) {
  const ts_config = require("../tsconfig.json");
  ts_config.compilerOptions.paths["@code/*"] = [`${set_to}/*`];

  fs.writeFileSync(path.join(__dirname, "..", "tsconfig.json"), JSON.stringify(ts_config, null, 4));
};

module.exports.jest = function (set_to) {
  const jest = require("../.jest.config.json");
  jest.moduleNameMapper["@code/(.*)"] = [`<rootDir>/src/${set_to}/$1`];

  fs.writeFileSync(path.join(__dirname, "..", ".jest.config.json"), JSON.stringify(jest, null, 4));
};
