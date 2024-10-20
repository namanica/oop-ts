import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];
export const items: MenuItem[] = [
  {
    label: "Файл",
    key: "file",
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
