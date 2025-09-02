import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import Sidebar from './Sidebar';
import Wizard from './Wizard';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import { Employee, Step } from '../types/employee';

const { Content } = Layout;
const { Title } = Typography;

const Dashboard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>();
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'Daniel Alves da Silva',
      cpf: '000.000.000-99',
      rg: '123456789',
      gender: 'Masculino',
      birthDate: '1990-01-01',
      position: 'Cargo 1',
      isActive: true,
      epis: [
        {
          id: '1',
          activity: 'Atividade 1',
          epiType: 'Calçado de segurança',
          caNumber: '9356',
        },
      ],
    },
    {
      id: '2',
      name: 'Giselle Torres Lopes',
      cpf: '000.000.000-88',
      rg: '987654321',
      gender: 'Feminino',
      birthDate: '1985-05-15',
      position: 'Cargo 2',
      isActive: false,
      epis: [],
    },
    {
      id: '3',
      name: 'Ana Bispo dos Santos',
      cpf: '000.000.000-99',
      rg: '456789123',
      gender: 'Feminino',
      birthDate: '1992-08-20',
      position: 'Cargo 1',
      isActive: false,
      epis: [],
    },
    {
      id: '4',
      name: 'Regina Elisa Souza',
      cpf: '000.000.000-99',
      rg: '789123456',
      gender: 'Feminino',
      birthDate: '1988-12-10',
      position: 'Cargo 3',
      isActive: true,
      epis: [],
    },
  ]);

  const steps: Step[] = [
    { id: 1, title: 'Item 1', icon: '🏢', isCompleted: false, isCurrent: true },
    { id: 2, title: 'Item 2', icon: '📝', isCompleted: false, isCurrent: false },
    { id: 3, title: 'Item 3', icon: '👥', isCompleted: false, isCurrent: false },
    { id: 4, title: 'Item 4', icon: '🔔', isCompleted: false, isCurrent: false },
    { id: 5, title: 'Item 5', icon: '📄', isCompleted: false, isCurrent: false },
    { id: 6, title: 'Item 6', icon: '🔄', isCompleted: false, isCurrent: false },
    { id: 7, title: 'Item 7', icon: '👤', isCompleted: false, isCurrent: false },
    { id: 8, title: 'Item 8', icon: '⚙️', isCompleted: false, isCurrent: false },
    { id: 9, title: 'Item 9', icon: '✅', isCompleted: false, isCurrent: false },
  ];

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    // Aqui você pode implementar a lógica para navegar entre as etapas
  };

  const handleAddEmployee = () => {
    setEditingEmployee(undefined);
    setShowForm(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleSaveEmployee = (employee: Employee) => {
    if (editingEmployee) {
      // Editar funcionário existente
      setEmployees(employees.map(emp => 
        emp.id === employee.id ? employee : emp
      ));
    } else {
      // Adicionar novo funcionário
      setEmployees([...employees, employee]);
    }
    setShowForm(false);
    setEditingEmployee(undefined);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingEmployee(undefined);
  };

  const handleToggleActive = (employeeId: string, isActive: boolean) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId ? { ...emp, isActive } : emp
    ));
  };

  return (
    <Layout className="dashboard">
      <Sidebar />
      <Layout>
        <Content className="dashboard-content">
          <div className="wizard-section">
            <Wizard
              steps={steps}
              currentStep={currentStep}
              onStepChange={handleStepChange}
            />
          </div>
          
          <div className="main-content">
            <div className="left-panel">
              <div className="placeholder-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit suscipit porttitor. Suspendisse ex lorem, rhoncus nec ante eu, venenatis aliquam turpis. Nulla facilisi. Curabitur nec mattis dolor. Nulla finibus bibendum ligula tempus vehicula. Ut at tristique libero, nec efficitur dui. Aliquam erat volutpat. Fusce quam sem, tempus nec justo eget, luctus scelerisque velit. Nam sollicitudin purus urna, vitae ornare neque tincidunt vel. Proin ac lacinia erat, et commodo felis. Phasellus tempor tellus eu vulputate tempus.
                </p>
                <div className="user-placeholder">
                  <img src={'icons/Foto.png'} className="user-avatar" />
                </div>
              </div>
            </div>
            
            <div className="right-panel">
              {showForm ? (
                <EmployeeForm
                  employee={editingEmployee}
                  onSave={handleSaveEmployee}
                  onCancel={handleCancelForm}
                />
              ) : (
                <EmployeeList
                  employees={employees}
                  onAddEmployee={handleAddEmployee}
                  onEditEmployee={handleEditEmployee}
                  onToggleActive={handleToggleActive}
                />
              )}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
