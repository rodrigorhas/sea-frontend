export interface EPI {
  id: string;
  activity: string;
  epiType: string;
  caNumber: string;
}

export interface Employee {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  gender: 'Feminino' | 'Masculino';
  birthDate: string;
  position: string;
  isActive: boolean;
  epis: EPI[];
  healthCertificate?: string;
}

export interface Step {
  id: number;
  title: string;
  icon: string;
  isCompleted: boolean;
  isCurrent: boolean;
}
