const fs = require("fs");
const path = require("path");

function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}

async function replaceStringsInFiles(dir, replacements, ext) {
  let filesModified = 0;

  const files = await fs.promises.readdir(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStats = await fs.promises.stat(filePath);

    if (fileStats.isDirectory()) {
      filesModified += await replaceStringsInFiles(filePath, replacements, ext);
    } else if (!ext || path.extname(file) === ext) {
      let fileContents = await fs.promises.readFile(filePath, "utf-8");
      for (const [searchStr, replaceStr] of Object.entries(replacements)) {
        fileContents = replaceAll(fileContents, searchStr, replaceStr);
      }

      if (fileContents !== (await fs.promises.readFile(filePath, "utf-8"))) {
        await fs.promises.writeFile(filePath, fileContents);
        filesModified++;
      }
    }
  }

  return filesModified;
}

async function replaceStringsInDir(dir, replacements, ext) {
  let filesModified = await replaceStringsInFiles(dir, replacements, ext);

  const subdirs = await fs.promises.readdir(dir);
  for (const subdir of subdirs) {
    const subdirPath = path.join(dir, subdir);
    const subdirStats = await fs.promises.stat(subdirPath);

    if (subdirStats.isDirectory()) {
      filesModified += await replaceStringsInDir(subdirPath, replacements, ext);
    }
  }

  return filesModified;
}

replaceStringsInDir(
  `${process.cwd()}/packages/qwik/src/components/`,
  {
    'preventdefault:submit=""': "preventdefault:submit",
    "event.preventDefault();": "",
  },
  ".tsx"
).then((numFilesModified) => {
  console.log(`Modified ${numFilesModified} files.`);
});
