"use client";
import { EnterpriseFilledIcon } from "@/src/assets/enterprise-filled-icon";
import { useEmployeeContext } from "@/src/providers/employee/EmployeeProvider";
import { Card, Flex, Typography } from "antd";

import styles from "./steps-employee.module.css";

export const StepsEmployee = () => {
  const totalSteps = 9;

  return (
    <Flex className={styles.container}>
      <Flex className={styles.steps}>
        <div className={styles.dotline}></div>
        {totalSteps &&
          [...Array(totalSteps)].map((item, index) => (
            <StepItem key={index} num={index} />
          ))}
      </Flex>
    </Flex>
  );
};

const StepItem = ({ num }: { num: number }) => {
  const { Text } = Typography;

  const title = `Item ${num + 1}`;

  const { stepCurrent } = useEmployeeContext();

  return (
    <Flex className={styles.item}>
      <Card
        className={
          stepCurrent > num
            ? `${styles.card} ${styles.approved}`
            : stepCurrent === num
              ? `${styles.card} ${styles.active} ${styles.approved}`
              : styles.card
        }
      >
        <EnterpriseFilledIcon w="32px" h="32px" />
      </Card>
      <Text className={styles.text}>{title}</Text>
    </Flex>
  );
};
