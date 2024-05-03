// @ts-ignore
import jest_config from "./.jest.config.json";
import fs from "fs";

let tests : string[] | null = null;
if (fs.existsSync("./jest.tests.json")) {
	const content = fs.readFileSync("./jest.tests.json", "utf8");
  tests = content ? JSON.parse(content) as string[] : [];
}
if (tests) {
	jest_config.testMatch = tests.map((t) => `**/__tests__/**/${t}.[jt]s`);
}

export default jest_config;
