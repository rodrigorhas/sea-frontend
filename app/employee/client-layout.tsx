import { NextAndPrevEmployee } from "@/src/components/employee/next-and-prev/NextAndPrevEmployee";
import { StepsEmployee } from "@/src/components/employee/steps/StepsEmployee";
import { Flex } from "antd";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex
      style={{
        width: "100%",
        flexDirection: "column",
        gap: "var(--layout-gap)",
      }}
    >
      {/*<StepsEmployee />*/}
      <Flex
        style={{
          width: "100%",
          flexDirection: "column",
          gap: "var(--layout-gap)",
        }}
      >
        <Flex
          style={{
            width: "100%",
            justifyContent: "start",
            alignItems: "start",
            gap: "var(--layout-gap)",
          }}
        >
          {children}
        </Flex>
        {/*<NextAndPrevEmployee />*/}
      </Flex>
    </Flex>
  );
}
