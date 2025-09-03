"use client";
import { Col, Flex, Row, Typography } from "antd";
import styles from "./form-employee.module.css";
import { ArrowIcon } from "@/src/assets/arro-icon";
import { Form, Formik } from "formik";
import { validationSchema } from "./form-employee.schema";
import { CheckboxEmployee } from "../checkbox/CheckboxEmployee";
import TextInput from "./inputs/text-input/TextInput";
import SelectInput from "./inputs/select-input/SelectInput";
import RadioInput from "./inputs/radio-input/RadioInput";
import EpiForm from "./epi/EpiForm";
import Config from "@/src/config";
import FileInput from "./inputs/file-input/FileInput";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  addEmployee,
  fetchEmployeeById,
  updateEmployee,
} from "@/src/redux/slices/employeeSlice";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useAppSelector";
import { Employee } from "@/src/types/FormEmployeeProps";

export const FormEmployee = () => {
  const { Text } = Typography;
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  let currentEmployee = useAppSelector(
    (state) => state.employees.currentEmployee ?? null,
  );

  const [initialValues, setInitialValues] = useState<Employee>({
    status: currentEmployee?.status ?? false,
    name: currentEmployee?.name ?? "",
    gender: currentEmployee?.gender ?? "male",
    cpf: currentEmployee?.cpf ?? "",
    birth: currentEmployee?.birth ?? "",
    rg: currentEmployee?.rg ?? "",
    job: currentEmployee?.job ?? "",
    epi: currentEmployee?.epi ?? false,
    epi_list: currentEmployee?.epi_list ?? [
      {
        activity: "",
        epi_items: [{ epi_type: "", ca_num: "" }],
      },
    ],
    health_certificate: currentEmployee?.health_certificate ?? null,
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployeeById(id as string));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id) {
      setInitialValues({
        status: currentEmployee?.status ?? false,
        name: currentEmployee?.name ?? "",
        gender: currentEmployee?.gender ?? "male",
        cpf: currentEmployee?.cpf ?? "",
        birth: currentEmployee?.birth ?? "",
        rg: currentEmployee?.rg ?? "",
        job: currentEmployee?.job ?? "",
        epi: currentEmployee?.epi ?? false,
        epi_list: currentEmployee?.epi_list ?? [
          {
            activity: "",
            epi_items: [{ epi_type: "", ca_num: "" }],
          },
        ],
        health_certificate: currentEmployee?.health_certificate ?? null,
      });
    } else {
      setInitialValues({
        status: false,
        name: "",
        gender: "male",
        cpf: "",
        birth: "",
        rg: "",
        job: "",
        epi: false,
        epi_list: [
          {
            activity: "",
            epi_items: [{ epi_type: "", ca_num: "" }],
          },
        ],
        health_certificate: null,
      });
    }
  }, [currentEmployee]);

  const handleSubmit = async (values: Employee) => {
    const idValue = (id as string) || null;

    try {
      if (idValue) {
        await dispatch(updateEmployee({ id: idValue, ...values })).unwrap();
      } else {
        await dispatch(addEmployee(values)).unwrap();
      }
      router.push("/employee/list");
    } catch (error) {
      console.error("Erro ao salvar funcionário:", error);
    }
  };

  return (
    <Flex className={styles.container}>
      <Flex className={styles.header}>
        <Link href={"/employee/list"}>
          <ArrowIcon w="24px" h="24px" bg={"var(--ant-color-bg-layout)"} />
        </Link>
        <Text className={styles.title}>
          {id ? "Editar Funcionário" : "Adicionar Funcionário"}
        </Text>
      </Flex>
      <Flex>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className={styles.form}>
              <Flex className={`${styles.status} ${styles.box}`}>
                <Text className={styles.text}>
                  O trabalhador está ativo ou inativo?
                </Text>
                <CheckboxEmployee
                  width={65}
                  label={values.status ? "Ativo" : "Inativo"}
                  onChange={() => setFieldValue("status", !values.status)}
                />
              </Flex>

              {/* DADOS PESSOAIS DO USUÁRIO */}
              <Flex vertical className={`${styles.box}`}>
                <Row gutter={18}>
                  <Col span={12}>
                    <TextInput
                      label="Nome"
                      placeholder="João Ferreira"
                      name="name"
                      key={"name"}
                    />
                  </Col>
                  <Col span={12}>
                    <RadioInput
                      label="Sexo"
                      options={[
                        { label: "Masculino", value: "male" },
                        { label: "Feminino", value: "female" },
                      ]}
                      name="gender"
                      key={"gender"}
                    />
                  </Col>
                </Row>
                <Row gutter={18}>
                  <Col span={12}>
                    <TextInput
                      label="CPF"
                      placeholder="000.000.000-00"
                      name="cpf"
                      key={"cpf"}
                      mask="###.###.###-##"
                    />
                  </Col>
                  <Col span={12}>
                    <TextInput
                      label="Data de Nascimento"
                      placeholder="20/10/1999"
                      name="birth"
                      key={"birth"}
                      mask="##/##/####"
                    />
                  </Col>
                </Row>
                <Row gutter={18}>
                  <Col span={12}>
                    <TextInput
                      label="RG"
                      name="rg"
                      key={"rg"}
                    />
                  </Col>
                  <Col span={12}>
                    <SelectInput
                      label="Cargo"
                      options={Config.jobPositionsList}
                      name="job"
                      key={"job"}
                    />
                  </Col>
                </Row>
              </Flex>

              {/* DADOS DO TRABALHO DO USUÁRIO */}
              <Flex vertical className={styles.box}>
                <Text className={styles.text}>
                  Quais EPIs o trabalhador usa na atividade ?
                </Text>
                <EpiForm values={values} setFieldValue={setFieldValue} />
              </Flex>

              <Flex className={styles.box}>
                <FileInput
                  label="Adicione atestado de saúde (opcional):"
                  name="health_certificate"
                  onFileChange={(file) =>
                    setFieldValue("health_certificate", file)
                  }
                />
              </Flex>

              <button type="submit" className={styles.btn}>
                Salvar
              </button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};
