"use client";
import { Flex } from "antd";
import { useState } from "react";

import styles from "./checkbox-employee.module.css";
import { CheckboxEmployeeProps } from "@/src/types/CheckboxEmployeeProps";

export const CheckboxEmployee: React.FC<CheckboxEmployeeProps> = ({
  width = 51,
  label,
  onChange,
}) => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);

    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <Flex>
      <Flex className={styles.checkbox} onClick={handleToggle}>
        <span
          style={{ width: width }}
          className={
            checked ? `${styles.btn} ${styles.active}` : `${styles.btn}`
          }
          onClick={handleToggle}
        >
          <div className={`${styles.circle}`}></div>

          <label>{label}</label>
        </span>
      </Flex>
    </Flex>
  );
};
