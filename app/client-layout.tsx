"use client";
import { BgPlusSize } from "@/src/assets/bg-plus-size";
import { ModalProvider } from "@/src/components/base/modal/Modal";
import Navbar from "@/src/components/base/Navbar/Navbar";
import { store } from "@/src/redux/store";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, Flex } from "antd";
import { Provider } from "react-redux";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = {
    "color-primary": "#649fbf",
    "color-primary-opacity": "#649fbf20",
    "color-bg-base": "#f2f2f2",
    "color-bg-spotlight": "#dbdbdb",
    "color-bg-layout": "#ffffff",
    "color-bg-dark": "#272F33",
  
    "layout-gap": "25px",
    "layout-padding": "24px",
    "layout-radius": "20px",
    "layout-shadow": "0px 2px 23px 0px #0000000D",
  
    "font-family": "'Ubuntu', sans-serif",
    "color-text-heading": "#707070",
    "color-text": "#959595",
    "color-text-dark": "#3A3A3A",
    "color-text-light-solid": "#fff",
    "color-text-placeholder": "#ffffff80",
  
    "font-size": 16,
    "font-size-heading-1": 28,
    "font-size-heading-2": 24,
    "font-size-icon": 14,
  
    "font-weight-strong": 700,
    "font-weight-medium": 500,
    "font-weight-regular": 400,
  };

  return (
    <Provider store={store}>
      <ModalProvider>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              cssVar: true,
              hashed: false,
              token: {
                colorPrimary: theme["color-primary"],
                colorBgBase: theme["color-bg-base"],
                colorBgSpotlight: theme["color-bg-spotlight"],
                colorBgLayout: theme["color-bg-layout"],
                fontFamily: theme["font-family"],
                colorTextHeading: theme["color-text-heading"],
                colorText: theme["color-text"],
                colorTextLightSolid: theme["color-text-light-solid"],
                colorTextPlaceholder: theme["color-text-placeholder"],
                fontSize: theme["font-size"],
                fontSizeHeading1: theme["font-size-heading-1"],
                fontSizeHeading2: theme["font-size-heading-2"],
                fontSizeIcon: theme["font-size-icon"],
                fontWeightStrong: theme["font-weight-strong"],
              },
              components: {
                Button: {
                  borderRadius: 4,
                },
              },
            }}
          >
            <Flex
              style={{
                flexDirection: "row",
                height: "100%",
                width: "100%",
                contain: "content",
                position: "relative",
                background: "var(--ant-color-bg-base)",
              }}
            >
              <Navbar />
              <Flex
                style={{
                  width: "100%",
                  overflow: "auto",
                  padding: "25px",
                  gap: "var(--layout-gap)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {children}
                <div
                  style={{
                    position: "absolute",
                    bottom: "calc(0% - 170px)",
                    right: "calc(0% - 75px)",
                    zIndex: -1,
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  <BgPlusSize
                    w="457px"
                    h="557px"
                    bg={"var(--ant-color-primary)"}
                  />
                </div>
              </Flex>
            </Flex>
          </ConfigProvider>
        </AntdRegistry>
      </ModalProvider>
    </Provider>
  );
}
