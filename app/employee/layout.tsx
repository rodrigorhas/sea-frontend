import ClientLayout from "./client-layout";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
