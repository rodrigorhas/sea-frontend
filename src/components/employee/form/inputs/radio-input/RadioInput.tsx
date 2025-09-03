import React from "react";
import { Field, ErrorMessage } from "formik";
import { Flex } from "antd";

import stylesInput from "../input.module.css";

interface RadioProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

const RadioInput: React.FC<RadioProps> = ({ name, label, options }) => {
  return (
    <Flex className={stylesInput.input}>
      <label htmlFor={name}>{label}</label>
      <fieldset>
        {options.map((option) => (
          <label key={option.value}>
            <Field type="radio" name={name} value={option.value} />
            {option.label}
          </label>
        ))}
      </fieldset>
      <ErrorMessage className={stylesInput.error} name={name} component="div" />
    </Flex>
  );
};

export default RadioInput;
