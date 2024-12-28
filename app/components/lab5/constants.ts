import { MenuProps } from "antd";
import { WebviewWindow } from "@tauri-apps/api/window";

const openTable = () => {
  new WebviewWindow("table", {
    url: "/?window=table",
    title: "table",
    width: 800,
    height: 600,
    resizable: true,
  });
};

const closeTable = async () => {
  const targetWindow = WebviewWindow.getByLabel("table");
  if (targetWindow) {
    await targetWindow.close();
  }
};

type MenuItem = Required<MenuProps>["items"][number];
export const items: MenuItem[] = [
  {
    label: "Обʼєкти",
    key: "objects",
    children: [
      { label: "Крапка", key: "dot" },
      { label: "Лінія", key: "line" },
      { label: "Прямокутник", key: "rectangle" },
      { label: "Еліпс", key: "ellipse" },
      { label: "Лінія з кружечками", key: "dumbbell" },
      { label: "Куб", key: "cube" },
    ],
  },
  {
    label: "Таблиця",
    key: "table",
    children: [
      {
        label: "Відкрити",
        key: "open_table",
        onClick: () => openTable(),
      },
      { label: "Закрити", key: "close_table", onClick: () => closeTable() },
    ],
  },
];
