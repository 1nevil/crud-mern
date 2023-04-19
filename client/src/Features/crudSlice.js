import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchEmpData,
  DeleteEmpData,
  createEmpData,
  updateEmpData,
} from "./crudApi";

const initialState = {
  pendding: false,
  employyes: [],
  error: "",
};

export const fetchEmp = createAsyncThunk("emps/fetchEmps", async () => {
  const response = await fetchEmpData();
  return response.data;
});

export const deleteEmp = createAsyncThunk("emps/deleteEmp", async (id) => {
  await DeleteEmpData(id);
  return id;
});
export const createEmp = createAsyncThunk(
  "emps/createEmp",
  async (employee) => {
    await createEmpData(employee);
    return employee;
  }
);

export const updateEmp = createAsyncThunk(
  "emps/updateEmp",
  async (employee) => {
    const emp = await updateEmpData(employee);
    return emp;
  }
);

export const empSlice = createSlice({
  name: "employeeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmp.pending, (state) => {
        state.pendding = true;
      })
      .addCase(fetchEmp.fulfilled, (state, action) => {
        state.pendding = false;
        state.employyes = action.payload;
      })
      .addCase(fetchEmp.rejected, (state, action) => {
        state.pendding = false;
        state.error = action.payload.message;
      })
      .addCase(deleteEmp.fulfilled, (state, action) => {
        state.pendding = false;
        state.employyes = state.employyes.filter(
          (employye) => employye._id !== action.payload
        );
      })
      .addCase(createEmp.fulfilled, (state, action) => {
        state.pendding = false;
        state.employyes.push(action.payload);
      })
      .addCase(updateEmp.fulfilled, (state) => {
        state.pendding = false;
        // state.employyes.push(action.payload);
      });
  },
});

export default empSlice.reducer;
