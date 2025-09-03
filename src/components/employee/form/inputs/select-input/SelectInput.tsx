import React from "react";
import { Field, ErrorMessage } from "formik";

import stylesInput from "../input.module.css";

import { Flex } from "antd";

interface SelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

const SelectInput: React.FC<SelectProps> = ({ name, label, options }) => {
  return (
    <Flex className={`${stylesInput.input}`}>
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name}>
        <option value="">Selecione</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage className={stylesInput.error} name={name} component="div" />
    </Flex>
  );
};

export default SelectInput;
