"use client";

import { Button, Flex, Typography } from "antd";
import { useEffect } from "react";
import styles from "./list-employee.module.css";
import { ListItemEmployee } from "./item/ListItemEmployee";
import { CheckboxEmployee } from "../checkbox/CheckboxEmployee";
import { useEmployeeContext } from "@/src/providers/employee/EmployeeProvider";
import Link from "next/link";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useAppSelector";
import { fetchEmployees } from "@/src/redux/slices/employeeSlice";
import Config from "@/src/config";

export const ListEmployee = () => {
  const { Text } = Typography;
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.employees.employees);

  const { setStepApproved, totalSteps } = useEmployeeContext();

  const [filtered, setFiltered] = useState(false);

  const handleTrueFiltered = () => {
    return setFiltered(true);
  };

  const handleFalseFiltered = () => {
    return setFiltered(false);
  };

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <Flex className={styles.card}>
      <Text className={styles.title}>Funcionário(s)</Text>
      <Flex className={styles.options}>
        <Button className={`${styles.btn} ${styles.addEmployee}`}>
          <Link
            className={styles.link}
            href={Config.menuItems.find((item) => item.key === "add")?.href || "#"}
          >
            + Adicionar Funcionário
          </Link>
        </Button>
        <Flex className={styles.row}>
          <Flex className={styles.subOptions}>
            <Button
              onClick={handleTrueFiltered}
              className={
                filtered ? `${styles.btn} ${styles.active}` : styles.btn
              }
            >
              Ver apenas ativos
            </Button>
            <Button
              onClick={handleFalseFiltered}
              className={
                !filtered ? `${styles.btn} ${styles.active}` : styles.btn
              }
            >
              Limpar filtros
            </Button>
          </Flex>
          <Flex>
            <Text className={styles.textTotalActive}>
              Ativos {employees.length}/{employees.length}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex className={styles.listEmployee}>
        {employees
          .filter((item) => (filtered ? item.status : item))
          .map((employee) => {
            return <ListItemEmployee key={employee.id} employee={employee} />;
          })}
      </Flex>
      <Flex className={styles.status}>
        <Text className={styles.text}>A etapa está concluída?</Text>
        <CheckboxEmployee
          label={isChecked ? "Sim" : "Não"}
          onChange={(e) => {
            setStepApproved(e ? totalSteps : 0);
            setIsChecked(e);
          }}
        />
      </Flex>
    </Flex>
  );
};
