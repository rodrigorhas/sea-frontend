"use client";

import { Button, Divider, Flex, Popover, Tag, Typography } from "antd";

import styles from "./list-item-employee.module.css";
import { DotsIcon } from "@/src/assets/dots-icon";
import { Employee } from "@/src/types/employee";
import Link from "next/link";
import { useAppDispatch } from "@/src/hooks/useAppSelector";
import { deleteEmployee } from "@/src/redux/slices/employeeSlice";
import { useModal } from "@/src/components/base/modal/Modal";
import Config from "@/src/config";

export const ListItemEmployee = ({ employee }: { employee: Employee }) => {
  const { Text } = Typography;

  const dispatch = useAppDispatch();

  const { showModal } = useModal();

  const handleDeleteUser = () => {
    dispatch(deleteEmployee(employee.id as string)).then(() => {
      showModal({
        title: "",
        content: "Usuário excluído com sucesso!",
        onOk: () => console.log("Confirmed"),
        onCancel: () => console.log("Cancelled"),
      });
    });
  };

  const suboptions = (
    <Flex vertical className={styles.popover}>
      <Link href={`/employee/${employee.id}`}>
        <Button style={{ background: "transparent" }} className={styles.btn}>
          Editar
        </Button>
      </Link>
      <Divider style={{ margin: "10px 0", padding: 0 }} />
      <Button
        onClick={handleDeleteUser}
        style={{ background: "transparent" }}
        className={styles.btn}
      >
        Excluir
      </Button>
    </Flex>
  );

  return (
    <Flex
      className={
        employee.status ? `${styles.card} ${styles.active}` : styles.card
      }
    >
      <Flex className={styles.desc}>
        <Text className={styles.name}>{employee.name}</Text>
        <Flex className={styles.tags}>
          <Tag className={styles.tag}>{employee.cpf}</Tag>
          <Tag className={styles.tag}>
            {employee.status ? "Ativo" : "Inativo"}
          </Tag>
          <Tag className={styles.tag}>
            {
              Config.jobPositionsList.find((item) => item.value === employee.job)
                ?.label
            }
          </Tag>
        </Flex>
      </Flex>
      <Flex className={styles.options}>
        <Popover
          placement="left"
          arrow={false}
          color="white"
          content={suboptions}
        >
          <a className={styles.btn}>
            <DotsIcon
              w="16px"
              h="16px"
              bg="var(--ant-color-text-light-solid)"
            />
          </a>
        </Popover>
      </Flex>
    </Flex>
  );
};
