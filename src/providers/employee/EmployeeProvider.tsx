"use client";
import EmployeeProviderProps from "@/src/types/EmployeeProviderProps";
import { createContext, useContext, useState } from "react";

const EmployeeContext = createContext<EmployeeProviderProps>({
  stepCurrent: 0,
  setStepCurrent: () => {},
  totalSteps: 9,
  stepApproved: -1,
  setStepApproved: () => {},
});

export const EmployeeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [stepCurrent, setStepCurrent] = useState<number>(0);
  const totalSteps = 9;
  const [stepApproved, setStepApproved] = useState<number>(0);

  return (
    <EmployeeContext.Provider
      value={{
        stepCurrent,
        setStepCurrent,
        totalSteps,
        stepApproved,
        setStepApproved,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => useContext(EmployeeContext);
