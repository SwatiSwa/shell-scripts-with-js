import { get } from "lodash";

const employee = {
  name: "@legacy-packages",
};

console.log("Assets", get(employee, "name"));
