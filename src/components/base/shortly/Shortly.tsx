"use client";
import { Typography } from "antd";

import styles from "./shortly.module.css";

export const Shortly = () => {
  const { Text } = Typography;

  return (
    <div className={styles.shortly}>
      <Text className={styles.text}>Em Breve</Text>
    </div>
  );
};
