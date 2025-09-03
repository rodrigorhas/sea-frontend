import { FieldArray } from "formik";
import { Flex, Row, Col, Button, Checkbox, Typography } from "antd";

import styles from "../form-employee.module.css";
import Config from "@/src/config";
import TextInput from "../inputs/text-input/TextInput";
import SelectInput from "../inputs/select-input/SelectInput";
import { Employee, SetFieldValue } from "@/src/types/FormEmployeeProps";

const EpiForm = ({
  values,
  setFieldValue,
}: {
  values: Employee;
  setFieldValue: SetFieldValue;
}) => {
  const { Text } = Typography;

  return (
    <Flex
      vertical
      style={{ justifyContent: "start", alignItems: "start", gap: "8px" }}
      className={styles.status}
    >
      <Flex
        style={{ justifyContent: "start", gap: "8px" }}
        className={`${styles.status}`}
      >
        <Checkbox
          checked={values.epi ? true : false}
          onChange={() => setFieldValue("epi", !values?.epi)}
        />
        <Text className={styles.text}>O trabalhador não usa EPI.</Text>
      </Flex>

      {!values?.epi && (
        <FieldArray
          name="epi_list"
          render={(arrayHelpers) => (
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: "15px",
                flexDirection: "column",
              }}
            >
              {values?.epi_list.map((activity, index) => (
                <Flex vertical className={styles.box} key={index}>
                  <Row>
                    <Col span={24}>
                      <SelectInput
                        name={`epi_list.${index}.activity`}
                        label="Selecione a atividade:"
                        options={Config.activitiesList}
                      />
                    </Col>
                  </Row>
                  <FieldArray
                    name={`epi_list.${index}.epi_items`}
                    render={(epiHelpers) => (
                      <>
                        {activity.epi_items
                          .slice()
                          .reverse()
                          .map((epi, epiIndex) => (
                            <Row gutter={10} key={epiIndex}>
                              <Col span={9}>
                                <SelectInput
                                  name={`epi_list.${index}.epi_items.${epiIndex}.epi_type`}
                                  label="Selecione o EPI:"
                                  options={Config.epiList}
                                />
                              </Col>
                              <Col span={9}>
                                <TextInput
                                  type="number"
                                  name={`epi_list.${index}.epi_items.${epiIndex}.ca_num`}
                                  label="Informe o número do CA:"
                                  max={4}
                                />
                              </Col>
                              <Col
                                span={6}
                                style={{
                                  justifyContent: "end",
                                  alignItems: "end",
                                  display: "flex",
                                  marginBottom: "2px",
                                }}
                              >
                                {epiIndex === activity.epi_items.length - 1 ? (
                                  <Button
                                    className={styles.btn}
                                    onClick={() =>
                                      epiHelpers.push({
                                        epi_type: "",
                                        ca_num: "",
                                      })
                                    }
                                  >
                                    Adicionar EPI
                                  </Button>
                                ) : (
                                  <Button
                                    className={styles.btn}
                                    onClick={() => epiHelpers.remove(epiIndex)}
                                  >
                                    Remover EPI
                                  </Button>
                                )}
                              </Col>
                            </Row>
                          ))}
                      </>
                    )}
                  />
                  {index > 0 && (
                    <Row>
                      <Col span={24}>
                        <Button
                          className={styles.btn}
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Excluir Atividade
                        </Button>
                      </Col>
                    </Row>
                  )}
                </Flex>
              ))}
              <Button
                className={styles.btn}
                onClick={() =>
                  arrayHelpers.push({
                    activity: "",
                    epi_items: [{ epi_type: "", ca_num: "" }],
                  })
                }
              >
                Adicionar outra atividade
              </Button>
            </div>
          )}
        />
      )}
    </Flex>
  );
};

export default EpiForm;
