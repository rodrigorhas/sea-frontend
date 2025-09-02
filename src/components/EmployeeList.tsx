import React, { useState } from 'react';
import {
  Input,
  Button,
  Card,
  Tag,
  Dropdown,
  Space,
  Switch,
  Typography,
  Row,
  Col
} from 'antd';
import { PlusOutlined, MoreOutlined, SearchOutlined } from '@ant-design/icons';
import { Employee } from '../types/employee';

const { Text } = Typography;

interface EmployeeListProps {
  employees: Employee[];
  onAddEmployee: () => void;
  onEditEmployee: (employee: Employee) => void;
  onToggleActive: (employeeId: string, isActive: boolean) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  onAddEmployee,
  onEditEmployee,
  onToggleActive,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyActive, setShowOnlyActive] = useState(false);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.cpf.includes(searchTerm);
    const matchesActiveFilter = showOnlyActive ? employee.isActive : true;
    return matchesSearch && matchesActiveFilter;
  });

  const activeCount = employees.filter(emp => emp.isActive).length;

  const getMenuItems = (employee: Employee) => [
    {
      key: 'edit',
      label: 'Editar',
      onClick: () => onEditEmployee(employee),
    },
    {
      key: 'toggle',
      label: employee.isActive ? 'Desativar' : 'Ativar',
      onClick: () => onToggleActive(employee.id, !employee.isActive),
    },
  ];

  return (
    <div className="employee-list">
      <div className="employee-header">
        <h2>Funcionário(s)</h2>
      </div>

      <div className="employee-controls">
        <Button
          type="default"
          variant="outlined"
          block
          icon={<PlusOutlined />}
          onClick={onAddEmployee}
        >
          Adicionar Funcionário
        </Button>

        <Button
            type={showOnlyActive ? 'primary' : 'default'}
            onClick={() => setShowOnlyActive(!showOnlyActive)}
        >
          Ver apenas ativos
        </Button>
        <Button onClick={() => {
          setSearchTerm('');
          setShowOnlyActive(false);
        }}>
          Limpar filtros
        </Button>
        <Text strong>Ativos {activeCount}/{employees.length}</Text>
      </div>

      <div className="employee-items">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="employee-card">
            <div className="employee-info">
              <div className="employee-details">
                <Text className="employee-name">{employee.name}</Text>
                <div>
                  <Tag>{employee.cpf}</Tag>
                  <Tag color={employee.isActive ? 'blue' : 'default'}>
                    {employee.isActive ? 'Ativo' : 'Inativo'}
                  </Tag>
                  <Tag color="blue">{employee.position}</Tag>
                </div>
              </div>
              <Dropdown
                menu={{ items: getMenuItems(employee) }}
                trigger={['click']}
                placement="bottomRight"
              >
                <Button type="text" icon={<MoreOutlined />} />
              </Dropdown>
            </div>
          </Card>
        ))}
      </div>

      <div className="step-completion">
        <Space>
          <Text>A etapa está concluída?</Text>
          <Switch checkedChildren="Sim" unCheckedChildren="Não" defaultChecked={false} />
        </Space>
        <Button type="default" size="large" style={{ backgroundColor: '#666', borderColor: '#666', color: 'white' }}>
          Próximo passo
        </Button>
      </div>
    </div>
  );
};

export default EmployeeList;
