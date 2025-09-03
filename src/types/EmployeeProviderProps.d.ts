import { Dispatch, SetStateAction } from "react";

type EmployeeProviderProps = {
  stepCurrent: number;
  setStepCurrent: Dispatch<SetStateAction<number>>;
  totalSteps: number;
  stepApproved: number;
  setStepApproved: Dispatch<SetStateAction<number>>;
};

export default EmployeeProviderProps;
