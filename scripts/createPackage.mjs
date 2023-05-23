#!/usr/bin/env zx

import { $, chalk } from "zx";

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
}

main();
