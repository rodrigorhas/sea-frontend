"use client";
import { Flex } from "antd";

import styles from "./next-and-prev-employee.module.css";
import { useEmployeeContext } from "@/src/providers/employee/EmployeeProvider";

export const NextAndPrevEmployee = () => {
  const { setStepCurrent, stepCurrent, totalSteps, stepApproved } =
    useEmployeeContext();

  const handlePrev = () => {
    return setStepCurrent(stepCurrent - 1);
  };

  const handleNext = () => {
    return setStepCurrent(stepCurrent + 1);
  };

  return (
    <Flex className={styles.container}>
      <a
        className={
          stepCurrent === 0 ? `${styles.btn} ${styles.hidden}` : styles.btn
        }
        onClick={handlePrev}
      >
        Passo anterior
      </a>
      <a
        className={
          stepCurrent < totalSteps && stepCurrent < stepApproved
            ? styles.btn
            : `${styles.btn} ${styles.hidden}`
        }
        onClick={handleNext}
      >
        Próximo passo
      </a>
    </Flex>
  );
};
