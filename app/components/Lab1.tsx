'use client';
import { Menu, MenuProps } from "antd";
import { FirstModalWorkOne } from "./FirstModalWorkOne";
import { SecondModalWorkOne } from "./SecondModalWorkOne";
import { ModalWorkTwo } from "./ModalWorkTwo";
import { ModalManager } from "../modules/ModalManager";
import { useState } from "react";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Робота 1',
    key: 'work1',
  },
  {
    label: 'Робота 2',
    key: 'work2',
  },
];

export const Lab1 = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [currentMenuItem, setCurrentMenuItem] = useState('work1');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const modalManager = new ModalManager(setCurrentStage);

  const handleOpen: MenuProps['onClick'] = (e) => {
    setCurrentMenuItem(e.key);
    if (e.key === 'work1') {
      modalManager.open(0);
    } else if (e.key === 'work2') {
      modalManager.open(2);
    }
  };

  const handleClose = () => {
    modalManager.close();
  };

  const handleNext = () => {
    modalManager.next();
  };

  const handleBack = () => {
    modalManager.back();
  };

  const handleSelectChange = (value: string) => {
    setSelectedGroup(value);
  };

  return (
    <>
      <Menu onClick={handleOpen} selectedKeys={[currentMenuItem]} mode="horizontal" items={items} />
      <FirstModalWorkOne
        isModalOpen={currentStage === 0}
        onNext={handleNext}
        onClose={handleClose}
      />
      <SecondModalWorkOne
        isModalOpen={currentStage === 1}
        onBack={handleBack}
        onClose={handleClose}
      />
      <ModalWorkTwo
        isModalOpen={currentStage === 2}
        onClose={handleClose}
        onSelectChange={handleSelectChange}
      />
      {selectedGroup && <p className='m-5'>Обрана група: {selectedGroup}</p>}
    </>
  );
}