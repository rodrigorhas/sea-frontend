"use client";

import { Button, Flex, Typography } from "antd";
import { useEffect } from "react";
import styles from "./list-employee.module.css";
import { ListItemEmployee } from "./item/ListItemEmployee";
import { CheckboxEmployee } from "../checkbox/CheckboxEmployee";
import { useEmployee } from "@/src/hooks/useEmployee";
import Link from "next/link";
import { useState } from "react";
import Config from "@/src/config";

export const ListEmployee = () => {
  const { Text } = Typography;
  const { 
    employees, 
    setApproved, 
    totalSteps, 
    fetchAllEmployees 
  } = useEmployee();

  const [filtered, setFiltered] = useState(false);

  const handleTrueFiltered = () => {
    return setFiltered(true);
  };

  const handleFalseFiltered = () => {
    return setFiltered(false);
  };

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  return (
    <Flex className={styles.card}>
      <Flex className={styles.header}>
        <Text className={styles.title}>Funcionário(s)</Text>
      </Flex>
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
          .filter((item) => (filtered ? item.status === true : true))
          .map((employee) => {
            return <ListItemEmployee key={employee.id} employee={employee} />;
          })}
      </Flex>
      <Flex className={styles.status}>
        <Text className={styles.text}>A etapa está concluída?</Text>
        <CheckboxEmployee
          label={isChecked ? "Sim" : "Não"}
          onChange={(e) => {
            setApproved(e ? totalSteps : 0);
            setIsChecked(e);
          }}
        />
      </Flex>
    </Flex>
  );
};
