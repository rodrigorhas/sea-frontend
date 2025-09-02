import httpClient from "@/src/api/httpClient";
import { Employee } from "@/src/types/FormEmployeeProps";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  currentEmployee: Employee | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
  currentEmployee: null,
};

// Async Thunks
export const fetchEmployees = createAsyncThunk<Employee[]>(
  "employees/fetchEmployees",
  async () => {
    return await httpClient<Employee[]>("employees");
  },
);

export const fetchEmployeeById = createAsyncThunk<Employee, string>(
  "employees/fetchEmployeeById",
  async (id) => {
    return await httpClient<Employee>(`employees/${id}`);
  },
);

export const addEmployee = createAsyncThunk<Employee, Employee>(
  "employees/addEmployee",
  async (newEmployee) => {
    return await httpClient<Employee>("employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    });
  },
);

export const updateEmployee = createAsyncThunk<Employee, Employee>(
  "employees/updateEmployee",
  async (updatedEmployee) => {
    const { id, ...data } = updatedEmployee;
    if (!id) throw new Error("ID is required for updating an employee");

    return await httpClient<Employee>(`employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
);

export const deleteEmployee = createAsyncThunk<void, string>(
  "employees/deleteEmployee",
  async (id) => {
    await httpClient<void>(`employees/${id}`, {
      method: "DELETE",
    });
  },
);

// Slice
const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEmployees.fulfilled,
        (state, action: PayloadAction<Employee[]>) => {
          state.employees = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch employees";
      })
      // Fetch a single Employee by ID
      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEmployeeById.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.currentEmployee = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch employee";
      })
      // Add Employee
      .addCase(
        addEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.employees.push(action.payload);
        },
      )
      // Update Employee
      .addCase(
        updateEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          const index = state.employees.findIndex(
            (emp) => emp.id === action.payload.id,
          );
          if (index !== -1) {
            state.employees[index] = action.payload;
          }
        },
      )
      // Delete Employee
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (emp) => emp.id !== action.meta.arg,
        );
      });
  },
});

export default employeeSlice.reducer;
