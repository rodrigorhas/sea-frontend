"use client";
import { Flex } from "antd";
import { useEmployee } from "@/src/hooks/useEmployee";

import styles from "./next-and-prev-employee.module.css";

export const NextAndPrevEmployee = () => {
  const { setStep, stepCurrent, totalSteps, stepApproved } = useEmployee();

  const handlePrev = () => {
    return setStep(stepCurrent - 1);
  };

  const handleNext = () => {
    return setStep(stepCurrent + 1);
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
