import { get } from "lodash";

const employee = {
  name: "@legacy-packages",
};

console.log("Redux", get(employee, "name"));
