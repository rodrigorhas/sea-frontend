import React, { createContext, useContext, useState, ReactNode } from "react";
import { Modal, Typography } from "antd";

interface ModalOptions {
  title: string;
  content: string;
  onOk?: () => void;
  onCancel?: () => void;
}

interface ModalContextProps {
  showModal: (options: ModalOptions) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);

  const showModal = (options: ModalOptions) => {
    setModalOptions(options);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setModalOptions(null);
  };

  const { Title } = Typography;

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal
        title={modalOptions?.title}
        open={modalVisible}
        centered
        styles={{
          content: {
            background: "#ffff",
            border: "2px solid var(--color-bg-spotlight)",
            color: "var(--color-text-dark)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            boxShadow: "0 6px 8px 0 #00000059",
            borderRadius: "25px",
          },
        }}
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}
        okButtonProps={{
          style: {
            background: "transparent",
            border: "unset",
            borderColor: "transparent",
            color: "#020202",
            fontFamily: "'Ubuntu', sans-serif",
            fontSize: "var(--ant-font-size)",
            fontWeight: "800",
          },
        }}
        onOk={() => {
          modalOptions?.onOk?.();
          hideModal();
        }}
        onCancel={() => {
          modalOptions?.onCancel?.();
          hideModal();
        }}
      >
        <Title level={4}>{modalOptions?.content}</Title>
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
