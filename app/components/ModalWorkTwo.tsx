'use client';
import React, { useState } from 'react';
import { Modal, Select } from 'antd';

interface ModalWorkTwoProps {
  isModalOpen: boolean;
  onClose: () => void;
  onSelectChange: (value: string) => void;
}

export const ModalWorkTwo = ({ isModalOpen, onClose, onSelectChange }: ModalWorkTwoProps) => {
  const [selectValue, setSelectvalue] = useState<string>('');
  const handleSelectChange = () => {
    onSelectChange(selectValue);
    onClose();
  };

  return (
    <Modal
      title="Модальне вікно 3"
      open={isModalOpen}
      onCancel={onClose}
      cancelText='Скасувати'
      onOk={handleSelectChange}
      okText='Так'
    >
      <Select
      className='m-3 ml-0 w-[300px]'
      placeholder="Оберіть групу"
      onChange={(value) => setSelectvalue(value)}
      options={[
        { value: 'ІМ-31', label: 'ІМ-31' },
        { value: 'ІМ-32', label: 'ІМ-32' },
        { value: 'ІМ-33', label: 'ІМ-33' },
        { value: 'ІМ-34', label: 'ІМ-34' },
      ]}
      />
    </Modal>
  );
};
