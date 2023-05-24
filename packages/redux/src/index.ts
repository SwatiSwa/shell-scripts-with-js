import { get } from "lodash";

const employee = {
  name: "@common-packages",
};

console.log("Redux", get(employee, "name"));
