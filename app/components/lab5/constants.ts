import { MenuProps } from "antd";
import { WebviewWindow } from "@tauri-apps/api/window";
import { Ellipse, Dot, Cube, Line, LineWithCircles, Rectangle } from "@/app/modules/MyEditor";

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

export const getDrawnObject = (shape: any) => {
  if (shape.radiusX && !shape.radius) return "Еліпс";
  if (shape.width && !shape.depth) return "Прямокутник";
  if (shape.radius) return "Лінія з кружечками";
  if (shape.depth) return "Куб";
  if (shape.startX && !shape.radius) return "Лінія";
  return "Крапка";
};

export const formatToClass = (shapes: any[]) => {
  return shapes.map((shape) => {
    const objectName = getDrawnObject(shape);
    if (objectName === "Еліпс") {
      return new Ellipse(
        shape.x,
        shape.y,
        shape.radiusX,
        shape.radiusY,
        shape.color
      );
    } else if (objectName === "Крапка") {
      return new Dot(shape.x, shape.y, shape.color);
    } else if (objectName === "Куб") {
      return new Cube(shape.x, shape.y, shape.width, shape.height, shape.color);
    } else if (objectName === "Лінія") {
      return new Line(
        shape.startX,
        shape.startY,
        shape.endX,
        shape.endY,
        shape.color
      );
    } else if (objectName === "Лінія з кружечками") {
      return new LineWithCircles(
        shape.startX,
        shape.startY,
        shape.endX,
        shape.endY,
        shape.color
      );
    } else if (objectName === "Прямокутник") {
      return new Rectangle(
        shape.x,
        shape.y,
        shape.width,
        shape.height,
        shape.color
      );
    }
  });
};
