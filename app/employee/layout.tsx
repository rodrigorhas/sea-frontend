import { EmployeeProvider } from "@/src/providers/employee/EmployeeProvider";
import ClientLayout from "./client-layout";

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <EmployeeProvider>
      <ClientLayout>{children}</ClientLayout>
    </EmployeeProvider>
  );
};

export default EmployeeLayout;
