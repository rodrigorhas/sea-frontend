import { useAppSelector, useAppDispatch } from "./useAppSelector";
import {
  selectEmployees,
  selectLoading,
  selectError,
  selectCurrentEmployee,
  selectStepCurrent,
  selectTotalSteps,
  selectStepApproved,
  setStepCurrent,
  setStepApproved,
  nextStep,
  prevStep,
  resetSteps,
  clearCurrentEmployee,
  clearError,
  fetchEmployees,
  fetchEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "@/src/redux/slices/employeeSlice";
import { Employee } from "@/src/types/employee";

export const useEmployee = () => {
  const dispatch = useAppDispatch();
  
  // Selectors
  const employees = useAppSelector(selectEmployees);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const currentEmployee = useAppSelector(selectCurrentEmployee);
  const stepCurrent = useAppSelector(selectStepCurrent);
  const totalSteps = useAppSelector(selectTotalSteps);
  const stepApproved = useAppSelector(selectStepApproved);

  // Actions
  const setStep = (step: number) => dispatch(setStepCurrent(step));
  const setApproved = (step: number) => dispatch(setStepApproved(step));
  const goToNextStep = () => dispatch(nextStep());
  const goToPrevStep = () => dispatch(prevStep());
  const resetAllSteps = () => dispatch(resetSteps());
  const clearEmployee = () => dispatch(clearCurrentEmployee());
  const clearErrorState = () => dispatch(clearError());

  // Async actions
  const fetchAllEmployees = () => dispatch(fetchEmployees());
  const fetchEmployee = (id: string) => dispatch(fetchEmployeeById(id));
  const createEmployee = (employee: Employee) => dispatch(addEmployee(employee));
  const editEmployee = (employee: Employee) => dispatch(updateEmployee(employee));
  const removeEmployee = (id: string) => dispatch(deleteEmployee(id));

  return {
    // State
    employees,
    loading,
    error,
    currentEmployee,
    stepCurrent,
    totalSteps,
    stepApproved,
    
    // Step actions
    setStep,
    setApproved,
    goToNextStep,
    goToPrevStep,
    resetAllSteps,
    
    // Employee actions
    clearEmployee,
    clearErrorState,
    
    // Async actions
    fetchAllEmployees,
    fetchEmployee,
    createEmployee,
    editEmployee,
    removeEmployee,
  };
};
