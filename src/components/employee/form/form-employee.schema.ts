import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string().required("O nome é obrigatório."),
  gender: Yup.string()
    .oneOf(["female", "male"], "Selecione um gênero válido.")
    .required("O gênero é obrigatório."),
  cpf: Yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido.")
    .required("O CPF é obrigatório."),
  birth: Yup.string().required("A data de nascimento é obrigatória."),
  rg: Yup.string().required("O RG é obrigatório."),
  job: Yup.string().required("O cargo é obrigatório."),
  epi: Yup.boolean(),
  epi_list: Yup.array().of(
    Yup.object({
      activity: Yup.string(),
      epi_type: Yup.string(),
      ca_num: Yup.number().max(9999, "O CA deve ter até 4 dígitos."),
    }),
  ),
  health_certificate: Yup.mixed().nullable(),
});
