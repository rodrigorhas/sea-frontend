import React from 'react';
import { 
  BankOutlined, 
  EditOutlined, 
  TeamOutlined, 
  BellOutlined, 
  FileOutlined, 
  ReloadOutlined, 
  UserOutlined 
} from '@ant-design/icons';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: 'icons/building.png', label: 'Empresa' },
    { icon: 'icons/edit.png', label: 'Editar' },
    { icon: 'icons/modules.png', label: 'Organização' },
    { icon: 'icons/notifications.png', label: 'Notificações' },
    { icon: 'icons/restore.png', label: 'Atualizar' },
    { icon: 'icons/user.png', label: 'Usuário' },
  ];

  return (
    <div className="sidebar">
      {menuItems.map((item, index) => (
        <div key={index} className="sidebar-item" title={item.label}>
          <img src={item.icon} />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
