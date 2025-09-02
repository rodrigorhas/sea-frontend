"use client";
import { Shortly } from "@/src/components/base/shortly/Shortly";
import Config from "@/src/config";
import { useEmployeeContext } from "@/src/providers/employee/EmployeeProvider";

const EmployeeListPage = () => {
  const { stepCurrent } = useEmployeeContext();

  return Config.steps[stepCurrent]?.content?.list || <Shortly />;
};

export default EmployeeListPage;
