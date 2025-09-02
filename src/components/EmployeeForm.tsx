import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Switch,
  Radio,
  DatePicker,
  Select,
  Checkbox,
  Upload,
  Card,
  Typography,
  Row,
  Col,
} from 'antd';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload';
import {
  ArrowLeftOutlined,
  PaperClipOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Employee, EPI } from '../types/employee';
import dayjs from 'dayjs';


const { Text } = Typography;

interface EmployeeFormProps {
  employee?: Employee;
  onSave: (employee: Employee) => void;
  onCancel: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employee,
  onSave,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [isActive, setIsActive] = useState(true);
  const [useEPI, setUseEPI] = useState(true);
  const [epis, setEpis] = useState<EPI[]>([]);
  const [healthCertificate, setHealthCertificate] = useState<string>('');

  useEffect(() => {
    if (employee) {
      form.setFieldsValue({
        ...employee,
        birthDate: employee.birthDate ? dayjs(employee.birthDate) : undefined,
      });
      setIsActive(employee.isActive);
      setEpis(employee.epis);
      setHealthCertificate(employee.healthCertificate || '');
      setUseEPI(employee.epis.length > 0);
    }
  }, [employee, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const employeeData: Employee = {
        id: employee?.id || Date.now().toString(),
        ...values,
        birthDate: values.birthDate?.format('YYYY-MM-DD') || '',
        isActive,
        epis: useEPI ? epis : [],
        healthCertificate,
      };
      onSave(employeeData);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const addEPI = () => {
    const newEPI: EPI = {
      id: Date.now().toString(),
      activity: '',
      epiType: '',
      caNumber: '',
    };
    setEpis([...epis, newEPI]);
  };

  const updateEPI = (id: string, field: keyof EPI, value: string) => {
    setEpis(epis.map(epi => 
      epi.id === id ? { ...epi, [field]: value } : epi
    ));
  };

  const removeEPI = (id: string) => {
    setEpis(epis.filter(epi => epi.id !== id));
  };

  const handleFileUpload = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'done' && info.file.name) {
      setHealthCertificate(info.file.name);
    }
  };

  const activities = ['Atividade 1', 'Atividade 2', 'Atividade 3'];
  const epiTypes = ['Calçado de segurança', 'Capacete', 'Óculos', 'Luvas', 'Protetor auditivo'];
  const positions = ['Cargo 1', 'Cargo 2', 'Cargo 3'];

  return (
    <div className="employee-form">
      <div className="form-header">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={onCancel}
          className="back-button"
        />
        <h2>{employee ? 'Editar Funcionário' : 'Adicionar Funcionário'}</h2>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          gender: 'Feminino',
          isActive: true,
        }}
      >
        {/* Status Section */}
        <Card className="form-section">
          <div className="status-toggle">
            <Text>O trabalhador está ativo ou inativo?</Text>
            <Switch
              checked={isActive}
              onChange={setIsActive}
              checkedChildren="Ativo"
              unCheckedChildren="Inativo"
            />
          </div>
        </Card>

        {/* Personal Details */}
        <Card className="form-section" title="Dados Pessoais">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Nome"
                rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
              >
                <Input placeholder="Nome" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cpf"
                label="CPF"
                rules={[{ required: true, message: 'Por favor, insira o CPF!' }]}
              >
                <Input placeholder="CPF" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="rg"
                label="RG"
                rules={[{ required: true, message: 'Por favor, insira o RG!' }]}
              >
                <Input placeholder="RG" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Sexo"
                rules={[{ required: true, message: 'Por favor, selecione o sexo!' }]}
              >
                <Radio.Group>
                  <Radio value="Feminino">Feminino</Radio>
                  <Radio value="Masculino">Masculino</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="birthDate"
                label="Data de Nascimento"
                rules={[{ required: true, message: 'Por favor, insira a data de nascimento!' }]}
              >
                <DatePicker style={{ width: '100%' }} placeholder="Data de Nascimento" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="position"
                label="Cargo"
                rules={[{ required: true, message: 'Por favor, selecione o cargo!' }]}
              >
                <Select placeholder="Selecione o cargo">
                  {positions.map(pos => (
                    <Select.Option key={pos} value={pos}>{pos}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* EPIs Section */}
        <Card className="form-section" title="EPIs (Equipamentos de Proteção Individual)">
          <div className="epi-section">
            <Checkbox
              checked={!useEPI}
              onChange={(e) => setUseEPI(!e.target.checked)}
            >
              O trabalhador não usa EPI.
            </Checkbox>

            {useEPI && (
              <div className="epi-list">
                {epis.map((epi) => (
                  <Card key={epi.id} className="epi-item" size="small">
                    <Row gutter={16} align="middle">
                      <Col span={6}>
                        <Select
                          placeholder="Selecione a atividade"
                          value={epi.activity}
                          onChange={(value) => updateEPI(epi.id, 'activity', value)}
                        >
                          {activities.map(activity => (
                            <Select.Option key={activity} value={activity}>
                              {activity}
                            </Select.Option>
                          ))}
                        </Select>
                      </Col>
                      <Col span={6}>
                        <Select
                          placeholder="Selecione o EPI"
                          value={epi.epiType}
                          onChange={(value) => updateEPI(epi.id, 'epiType', value)}
                        >
                          {epiTypes.map(type => (
                            <Select.Option key={type} value={type}>
                              {type}
                            </Select.Option>
                          ))}
                        </Select>
                      </Col>
                      <Col span={6}>
                        <Input
                          placeholder="Informe o número do CA"
                          value={epi.caNumber}
                          onChange={(e) => updateEPI(epi.id, 'caNumber', e.target.value)}
                        />
                      </Col>
                      <Col span={4}>
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => removeEPI(epi.id)}
                        />
                      </Col>
                    </Row>
                  </Card>
                ))}
                
                <Button 
                  type="dashed" 
                  onClick={addEPI}
                  icon={<PlusOutlined />}
                  style={{ width: '100%', marginTop: 16 }}
                >
                  Adicionar outra atividade
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Health Certificate */}
        <Card className="form-section" title="Atestado de Saúde (opcional)">
          <div className="file-upload">
            {healthCertificate && (
              <div className="file-display">
                <PaperClipOutlined />
                <Text>{healthCertificate}</Text>
              </div>
            )}
            <Upload
              beforeUpload={() => false}
              onChange={handleFileUpload}
              showUploadList={false}
            >
              <Button icon={<PaperClipOutlined />}>
                Selecionar arquivo
              </Button>
            </Upload>
          </div>
        </Card>

        {/* Save Button */}
        <div className="form-actions">
          <Button type="primary" size="large" onClick={handleSave}>
            Salvar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EmployeeForm;
