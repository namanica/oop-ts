export abstract class Shape {
  protected color: string;
  constructor(color: string) {
    this.color = color;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
}

export interface Previewable {
  drawPreview(ctx: CanvasRenderingContext2D): void;
}

export class Dot extends Shape {
  private x: number;
  private y: number;

  constructor(x: number, y: number, color: string = "blue") {
    super(color);
    this.x = x;
    this.y = y;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export class Line extends Shape {
  private startX: number;
  private startY: number;
  private endX: number;
  private endY: number;

  constructor(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    color: string = "blue"
  ) {
    super(color);
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

export class Rectangle extends Shape implements Previewable {
  private x: number;
  private y: number;
  private width: number;
  private height: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string = "yellow"
  ) {
    super(color);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  drawPreview(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = "blue";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

export class Ellipse extends Shape implements Previewable {
  private x: number;
  private y: number;
  private radiusX: number;
  private radiusY: number;

  constructor(
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    color: string = "grey"
  ) {
    super(color);
    this.x = x;
    this.y = y;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  drawPreview(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "blue";
    ctx.stroke();
  }
}
