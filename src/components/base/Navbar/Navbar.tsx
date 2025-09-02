"use client";
import { Flex } from "antd";
import { useEffect, useState } from "react";

import styles from "./navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BellIcon } from "@/src/assets/bell-icon";
import Config from "@/src/config";

const Navbar = () => {
  const [current, setCurrent] = useState("enterprise");

  const onClick = (e: string) => {
    setCurrent(e);
  };

  const pathname = usePathname();

  useEffect(() => {
    const currentHref =
      Config.menuItems.find((item) => {
        if (pathname.split("/")[1] == item.href.split("/")[1]) return item;
      })?.key || "enterprise";
    setCurrent(currentHref);
  }, [pathname]);

  return (
    <Flex
      key={"flex-menu"}
      className={styles.menu}
      align="center"
      justify="center"
      vertical
    >
      <div className={styles.logo}></div>
      {Config.menuItems
        .filter((item) => item.view)
        .map((item) => {
          const Icon: any = item.icon || <BellIcon />;
          const Badge = item.badge || null;
          return (
            <Link
              key={item.key}
              className={
                current === item.key
                  ? `${styles.button} ${styles.active}`
                  : styles.button
              }
              onClick={() => onClick(item.key)}
              href={item.href}
            >
              <div className={styles.btn}>
                {<Icon w="21px" h="21px" bg={"var(--ant-color-primary)"} />}
                {Badge && (
                  <div className={styles.badge}>
                    <Badge w="10px" h="10px" />
                  </div>
                )}
              </div>
              <div className={styles.bar}></div>
            </Link>
          );
        })}
    </Flex>
  );
};

export default Navbar;
