import { get } from "lodash";

const employee = {
  name: "John Smith",
};

console.log("Redux", get(employee, "name"));
