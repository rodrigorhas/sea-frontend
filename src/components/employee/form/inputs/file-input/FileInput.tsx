import React, { useState } from "react";
import { Button } from "antd";

import styles from "../../form-employee.module.css";

interface FileProps {
  name: string;
  label: string;
  onFileChange: (file: File | null) => void;
}

const FileInput: React.FC<FileProps> = ({ name, label, onFileChange }) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFileName(file.name);
      onFileChange(file);
    } else {
      setFileName("");
      onFileChange(null);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <label htmlFor={name}>{label}</label>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "12px",
          justifyContent: "center",
          border: "1px solid var(--ant-color-primary)",
          borderRadius: "10px",
        }}
      >
        <span
          style={{
            fontWeight: "var(--font-weight-regular)",
            fontSize: "var(--ant-font-size)",
          }}
        >
          {fileName || "Nenhum arquivo selecionado"}
        </span>
      </div>
      <Button
        className={styles.btn}
        type="link"
        onClick={() => document.getElementById(name)?.click()}
        style={{ padding: 0 }}
      >
        Selecionar Arquivo
      </Button>
      <input
        id={name}
        name={name}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default FileInput;
