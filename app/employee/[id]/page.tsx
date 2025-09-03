"use client";
import { Shortly } from "@/src/components/base/shortly/Shortly";
import Config from "@/src/config";
import { useEmployee } from "@/src/hooks/useEmployee";

const EmployeeEditPage = () => {
  const { stepCurrent } = useEmployee();

  return Config.steps[stepCurrent]?.content?.form || <Shortly />;
};

export default EmployeeEditPage;
