export type EpiItem = {
  epi_type: string;
  ca_num: string;
};

export type Activity = {
  activity: string;
  epi_items: EpiItem[];
};

export type Employee = {
  id?: string;
  status: boolean;
  name: string;
  gender: "female" | "male";
  cpf: string;
  birth: string;
  rg: string;
  job: string;
  epi: boolean;
  epi_list: Activity[];
  health_certificate?: File | null;
};

export type SetFieldValue = <Employee>(
  field: string,
  value: Employee | any,
  shouldValidate?: boolean,
) => void;
