"use client";
import { Flex, Typography } from "antd";
import { UserProfileIcon } from "@/src/assets/user-profile-icon";

import styles from "./desc-employee.module.css";

export const DescEmployee = () => {
  const { Text } = Typography;

  return (
    <Flex className={styles.container}>
      <Flex className={styles.card}>
        <Flex className={styles.flex}>
          <Text className={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit
            suscipit porttitor. Suspendisse ex lorem, rhoncus nec ante eu,
            venenatis aliquam turpis. Nulla facilisi. Curabitur nec mattis
            dolor. Nulla finibus bibendum ligula tempus vehicula. Ut at
            tristique libero, nec efficitur dui. Aliquam erat volutpat. Fusce
            quam sem, tempus nec justo eget, luctus scelerisque velit. Nam
            sollicitudin purus urna, vitae ornare neque tincidunt vel. Proin ac
            lacinia erat, et commodo felis. Phasellus tempor tellus eu vulputate
            tempus.
          </Text>
          <UserProfileIcon w="142px" h="159px" bg="#959595" />
        </Flex>
      </Flex>
    </Flex>
  );
};
