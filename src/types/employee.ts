export interface EPI {
  id: string;
  activity: string;
  epiType: string;
  caNumber: string;
}

export interface Employee {
  id?: string;
  name: string;
  cpf: string;
  rg: string;
  gender: 'female' | 'male';
  birthDate?: string;
  birth?: string;
  position?: string;
  job?: string;
  isActive?: boolean;
  status?: boolean;
  epis?: EPI[];
  epi?: boolean;
  epi_list?: any[];
  healthCertificate?: string;
  health_certificate?: File | null;
}

export interface Step {
  id: number;
  title: string;
  icon: string;
  isCompleted: boolean;
  isCurrent: boolean;
}
