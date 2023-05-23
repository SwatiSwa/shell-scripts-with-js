#!/usr/bin/env zx

import { $, chalk } from "zx";

$.verbose = false;

function exitWithError(errorMessage) {
  console.error(chalk.red(errorMessage));
  process.exit(1);
}

async function main() {
  let folderName = await question("What is your Folder Name? ");
  console.log(folderName);

  const packageJsonContent = `
   {
     "name" : "@common/${folderName}",
     "description": "Common Description"
   }
  `;

  await `mkdir -p packages/${folderName}/src`;
  fs.outputFileSync(
    `packages/${folderName}/src/package.json`,
    packageJsonContent
  );
  await $`cp -r legacy-packages/${folderName}/src/* packages/${folderName}/src/.`;
}

main();
