#!/usr/bin/env zx

import { $, chalk } from "zx";

$.verbose = false;

function exitWithError(errorMessage) {
  console.error(chalk.red(errorMessage));
  process.exit(1);
}

async function getPackages(folderPath) {
  let packagesList = (await $`ls -ltr ${folderPath} |awk '{print $9}'|sort`)
    .stdout;
  console.log(chalk.green(packagesList.trim()));
  return packagesList.trim().split("\n");
}

async function findNoOfReferences(folderPath,pck) {
  try {
    let searchString = `${folderPath}/${pck}`;
    let count = (await $`grep -rnw . -e ${searchString}|wc -l`).stdout;
    console.log("This is the package", pck, count);
  } catch (e) {
    console.error(chalk.red(e.message));
  }
}

async function main() {
  const folderPath = 'path of folder where references has to checked';
  const packages = await getPackages(folderPath);

  try {
    for (let pck of packages) {
      await findNoOfReferences(folderPath, pck);
    }
  } catch (error) {
    exitWithError(`Error: Required command ${error.message}`);
  }
}

main();
