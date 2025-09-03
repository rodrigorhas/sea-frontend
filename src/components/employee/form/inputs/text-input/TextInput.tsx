"use client";

import React, { useRef } from "react";
import { Field, ErrorMessage, FieldProps } from "formik";
import { InputMask } from "@react-input/mask";

import stylesInput from "../input.module.css";
import { Flex } from "antd";

interface InputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  mask?: string;
  max?: number;
}

const TextInput: React.FC<InputProps> = ({
  name,
  label,
  type = "text",
  placeholder = "Digite aqui...",
  max,
  mask,
}) => {
  const inputRef = useRef<HTMLInputElement | undefined>(undefined);

  return (
    <Flex className={`${stylesInput.input}`}>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ field, form }: FieldProps) =>
          mask ? (
            <InputMask
              id={name}
              type={type}
              mask={mask}
              maxLength={max}
              placeholder={placeholder}
              className={stylesInput.maskedInput}
              ref={inputRef as any}
              value={field.value || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                form.setFieldValue(name, value);
              }}
              onBlur={field.onBlur}
              replacement={{ 
                "#": /[0-9]/,
                "a": /[a-zA-Z]/,
                "*": /./
              }}
            />
          ) : (
            <input
              {...field}
              id={name}
              type={type}
              maxLength={max}
              placeholder={placeholder}
              className={stylesInput.textInput}
              ref={inputRef as any}
            />
          )
        }
      </Field>
      <ErrorMessage name={name} component="div" className={stylesInput.error} />
    </Flex>
  );
};

export default TextInput;
