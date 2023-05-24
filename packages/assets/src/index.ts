import { get } from "lodash";

const employee = {
  name: "@common-packages",
};

console.log("Assets", get(employee, "name"));
