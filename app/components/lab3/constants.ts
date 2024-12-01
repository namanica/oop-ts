import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];
export const items: MenuItem[] = [
  {
    label: "Файл",
    key: "file",
    children: [
      { label: "Створити", key: "create" },
      { label: "Відкрити", key: "open" },
      { label: "Зберегти", key: "save" },
      { type: "divider" },
      { label: "Друк", key: "print" },
      { type: "divider" },
      { label: "Вихід", key: "exit" },
    ],
  },
  {
    label: "Обʼєкти",
    key: "objects",
    children: [
      { label: "Крапка", key: "dot" },
      { label: "Лінія", key: "line" },
      { label: "Прямокутник", key: "rectangle" },
      { label: "Еліпс", key: "ellipse" },
    ],
  },
  {
    label: "Довідка",
    key: "note",
  },
];
