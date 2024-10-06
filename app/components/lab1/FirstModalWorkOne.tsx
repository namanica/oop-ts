import React from 'react';
import { Modal } from 'antd';

interface FirstModalWorkOneProps {
  isModalOpen: boolean;
  onNext: () => void;
  onClose: () => void;
}

export const FirstModalWorkOne = ({ isModalOpen, onNext, onClose }: FirstModalWorkOneProps) => {
  return (
    <Modal
      title="Модальне вікно 1"
      open={isModalOpen}
      cancelText='Скасувати'
      onCancel={onClose}
      okText='Далі'
      onOk={onNext}
      closable={false}
      centered={true}
    />
  );
};
