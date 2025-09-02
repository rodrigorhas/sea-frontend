import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./slices/employeeSlice";

// Crie a store
export const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

// Tipos da store e do dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
