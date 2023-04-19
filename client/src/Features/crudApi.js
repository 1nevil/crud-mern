import axios from "axios";

//http://localhost:8080/

export function fetchEmpData() {
  return axios.get("emp/read");
}

export function createEmpData(employee) {
  return axios.post("emp/insert", employee, {
    "Content-Type": "application / json",
  });
}
export function DeleteEmpData(id) {
  return axios.delete("emp/delete", id);
}
export function updateEmpData(employee) {
  return axios.post("/emp/update", employee);
}
