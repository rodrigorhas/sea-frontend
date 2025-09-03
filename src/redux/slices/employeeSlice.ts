import httpClient from "@/src/api/httpClient";
import { Employee } from "@/src/types/employee";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  currentEmployee: Employee | null;
  // Step management
  stepCurrent: number;
  totalSteps: number;
  stepApproved: number;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
  currentEmployee: null,
  stepCurrent: 0,
  totalSteps: 9,
  stepApproved: 0,
};

// Async Thunks
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await httpClient<Employee[]>("employees");
    return response;
  },
);

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchEmployeeById",
  async (id: string) => {
    const response = await httpClient<Employee>(`employees/${id}`);
    return response;
  },
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (newEmployee: Employee) => {
    const response = await httpClient<Employee>("employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    });
    return response;
  },
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (updatedEmployee: Employee) => {
    const { id, ...data } = updatedEmployee;
    if (!id) throw new Error("ID is required for updating an employee");

    const response = await httpClient<Employee>(`employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  },
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id: string) => {
    await httpClient<void>(`employees/${id}`, {
      method: "DELETE",
    });
    return id;
  },
);

// Slice
const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    // Step management actions
    setStepCurrent: (state, action: PayloadAction<number>) => {
      state.stepCurrent = action.payload;
    },
    setStepApproved: (state, action: PayloadAction<number>) => {
      state.stepApproved = action.payload;
    },
    nextStep: (state) => {
      if (state.stepCurrent < state.totalSteps - 1) {
        state.stepCurrent += 1;
      }
    },
    prevStep: (state) => {
      if (state.stepCurrent > 0) {
        state.stepCurrent -= 1;
      }
    },
    resetSteps: (state) => {
      state.stepCurrent = 0;
      state.stepApproved = 0;
    },
    // Clear current employee
    clearCurrentEmployee: (state) => {
      state.currentEmployee = null;
    },
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch employees";
      })
      // Fetch a single Employee by ID
      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.currentEmployee = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch employee";
      })
      // Add Employee
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      // Update Employee
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (emp) => emp.id === action.payload.id,
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
        // Update current employee if it's the same one
        if (state.currentEmployee?.id === action.payload.id) {
          state.currentEmployee = action.payload;
        }
      })
      // Delete Employee
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (emp) => emp.id !== action.payload,
        );
        // Clear current employee if it's the deleted one
        if (state.currentEmployee?.id === action.payload) {
          state.currentEmployee = null;
        }
      });
  },
});

// Export actions
export const {
  setStepCurrent,
  setStepApproved,
  nextStep,
  prevStep,
  resetSteps,
  clearCurrentEmployee,
  clearError,
} = employeeSlice.actions;

// Export selectors
export const selectEmployees = (state: { employees: EmployeeState }) => state.employees.employees;
export const selectLoading = (state: { employees: EmployeeState }) => state.employees.loading;
export const selectError = (state: { employees: EmployeeState }) => state.employees.error;
export const selectCurrentEmployee = (state: { employees: EmployeeState }) => state.employees.currentEmployee;
export const selectStepCurrent = (state: { employees: EmployeeState }) => state.employees.stepCurrent;
export const selectTotalSteps = (state: { employees: EmployeeState }) => state.employees.totalSteps;
export const selectStepApproved = (state: { employees: EmployeeState }) => state.employees.stepApproved;

export default employeeSlice.reducer;
