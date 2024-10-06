import React from 'react';
import { Modal, Button } from 'antd';

interface SecondModalWorkOneProps {
  isModalOpen: boolean;
  onBack: () => void;
  onClose: () => void;
}

export const SecondModalWorkOne = ({ isModalOpen, onBack, onClose }: SecondModalWorkOneProps) => {
  return (
    <Modal
      title="Модальне вікно 2"
      open={isModalOpen}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onBack}>
          Назад
        </Button>,
        <Button key="cancel" type="primary" onClick={onClose}>
          Скасувати
        </Button>
      ]}
      closable={false}
      centered={true}
    />
  );
};
