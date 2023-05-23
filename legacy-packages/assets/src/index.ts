import { get } from "lodash";

const employee = {
  name: "John Smith",
};

console.log("Assets", get(employee, "name"));
