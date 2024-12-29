/* eslint-disable @typescript-eslint/no-explicit-any */
import { listen } from "@tauri-apps/api/event";
import { WebviewWindow } from "@tauri-apps/api/window";
import { getDrawnObject } from "../components/lab5/constants";
import { writeFile } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";

export interface ShapesForTable {
  key: number;
  object: string;
  x: number | null;
  y: number | null;
  startX: number | null;
  startY: number | null;
  endX: number | null;
  endY: number | null;
}

export class TableManager {
  private static instance: TableManager;
  private receivedShapes: ShapesForTable[] = [];
  private originalShapes: any[] = [];
  private subscribers: Set<() => void> = new Set();

  private constructor() {}

  public static getInstance(): TableManager {
    if (!TableManager.instance) {
      TableManager.instance = new TableManager();
    }
    return TableManager.instance;
  }

  public subscribe(callback: () => void): void {
    this.subscribers.add(callback);
  }

  public unsubscribe(callback: () => void): void {
    this.subscribers.delete(callback);
  }

  private notifySubscribers(): void {
    this.subscribers.forEach((callback) => callback());
  }

  public getReceivedShapes(): ShapesForTable[] {
    return this.receivedShapes;
  }

  public setReceivedShapes(shapes: ShapesForTable[]): void {
    this.receivedShapes = shapes;
    this.notifySubscribers();
  }

  public getOriginalShapes(): any[] {
    return this.originalShapes;
  }

  public setOriginalShapes(shapes: any[]): void {
    this.originalShapes = shapes;
    this.notifySubscribers();
  }

  public deleteShape(key: number): void {
    this.receivedShapes = this.receivedShapes.filter(
      (shape) => shape.key !== key
    );
    this.originalShapes = this.originalShapes.filter(
      (_, index) => index !== key
    );

    this.notifySubscribers();

    const mainWindow = WebviewWindow.getByLabel("main");
    if (mainWindow) {
      mainWindow.emit("update-shapes", this.originalShapes);
    }
  }

  public highlightShapes(selectedRowKeys: React.Key[]): void {
    const mainWindow = WebviewWindow.getByLabel("main");
    if (mainWindow) {
      mainWindow.emit("highlight-shapes", selectedRowKeys);
    }
  }

  public async writeShapesToFile(shapes: ShapesForTable[]): Promise<void> {
    try {
      const desktopPath = await desktopDir();
      const filePath = `${desktopPath}/shapes.txt`;

      const fileContent = shapes
        .map(
          (shape) =>
            `${shape.object} з координатами: ${JSON.stringify({
              x: shape.x || null,
              y: shape.y || null,
              startX: shape.startX || null,
              startY: shape.startY || null,
              endX: shape.endX || null,
              endY: shape.endY || null,
            })}`
        )
        .join("\n");

      await writeFile({
        path: filePath,
        contents: fileContent,
      });

      console.log(`File written successfully to ${filePath}`);
    } catch (err) {
      console.error("Error writing file:", err);
    }
  }

  public listenForShapes(): void {
    listen<any[]>("send-shapes", async (event) => {
      const shapes = event.payload.map((shape, index) => ({
        key: index,
        object: getDrawnObject(shape),
        x: shape.x || null,
        y: shape.y || null,
        startX: shape.startX || null,
        startY: shape.startY || null,
        endX: shape.endX || null,
        endY: shape.endY || null,
      }));

      this.setReceivedShapes(shapes);
      this.setOriginalShapes(event.payload);

      await this.writeShapesToFile(shapes);
    });
  }
}
