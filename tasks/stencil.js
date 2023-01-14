const { exec } = require("child_process");
var glob = require("glob");
const path = require("path");

const globPath = "**/*.lite.tsx";
glob(globPath, {}, function (er, files) {
  for (const file of files || []) {
    exec(
      `npx mitosis compile -t stencil ./${file} > ./output/stencil/src/components/${file
        .split("/")
        .pop()
        .replace(".lite", "")}`,
      (err, stdout, stderr) => {
        if (err) {
          // node couldn't execute the command
          return;
        }
      }
    );
  }
});
