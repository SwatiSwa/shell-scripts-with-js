#! /usr/bin/env zx

import { $, chalk, question, fs, cd, ssh } from "zx";
import path from "path";

$.verbose = false;

function exitWithError(errorMessage) {
  console.error(chalk.red(errorMessage));
  process.exit(1);
}

async function main() {
  let folderName = await question(chalk.blue("What is your Folder Name? "));
  let targetFolderName = path.resolve("legacy-packages", folderName);

  if (!(await fs.pathExists(targetFolderName))) {
    exitWithError(`Error: Target folder name '${folderName}' does not exist`);
  }

  const packageJson = await fs.readJson("./legacy-packages/package.json");

  packageJson.name = `@common/${folderName}`;
  console.log(
    chalk.yellow(
      "Package content as follows:\n",
      JSON.stringify(packageJson, null, 3)
    )
  );

  await $`mkdir -p packages/${folderName}/src`;
  fs.outputFileSync(
    `packages/${folderName}/package.json`,
    JSON.stringify(packageJson, null, 3)
  );
  await $`cp -r legacy-packages/${folderName}/src/* packages/${folderName}/src/`;
  //Reference: https://stackoverflow.com/questions/6758963/find-and-replace-with-sed-in-directory-and-sub-directories#comment116788013_35607711
  //Note: grep and sed command has to be combined to do the find and replace action
  await $`grep -lR "@legacy-packages" packages | xargs sed -i '' 's/@legacy-packages/@common-packages/g'`;
  cd(`./packages/${folderName}`);
  const dir = await $`pwd`;
  console.log("dir", dir);
  try {
    const npmI = (await $`npm i`).stdout;
    // const output = (await $`npx depcheck --json`).stdout;
    // console.log("output", output);
    //const result = $(await `npx depcheck`);
    ssh("./script.sh");
    //console.log(chalk.blue(`${result}`));
  } catch (error) {
    console.log("error", error);
  }
}

main();
