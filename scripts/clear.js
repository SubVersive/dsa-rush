const fs = require("fs");
const path = require("path");

const src_path = path.join(__dirname, "..", "src");

try {
  const testsFile = path.join(__dirname, "..", "jest.tests.json");
  if (fs.existsSync(testsFile)) {
    fs.unlinkSync(testsFile);
  }

  fs.readdirSync(src_path)
    .filter((f) => {
      if (f === "solutions") {
        console.log("found", f);
        return true;
      }
      console.log("ignoring", f);
      return false;
    })
    .forEach((f) => {
      const file = path.join(src_path, f);
      console.log("deleting", file);
      fs.rmSync(file, {
        recursive: true,
        force: true,
      });
    });
} catch (e) {
  console.log(e);
}
