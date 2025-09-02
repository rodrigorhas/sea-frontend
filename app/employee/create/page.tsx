"use client";
import { Shortly } from "@/src/components/base/shortly/Shortly";
import Config from "@/src/config";
import { useEmployeeContext } from "@/src/providers/employee/EmployeeProvider";

const EmployeeAddPage = () => {
  const { stepCurrent } = useEmployeeContext();

  return Config.steps[stepCurrent]?.content?.form || <Shortly />;
};

export default EmployeeAddPage;
