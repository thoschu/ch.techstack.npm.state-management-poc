abstract class Shape {
  protected color: string;

  protected constructor(color: string) {
    this.color = color;
  }

  abstract getArea(): number;
}

export class Rectangle extends Shape {
  protected width: number;
  protected height: number;

  constructor(width: number, height: number, color: string) {
    super(color);

    this.width = width;
    this.height = height;
  }

  public getArea(): number {
    return this.width * this.height;
  }
}

// Erweiterung der Form-Klasse durch die Kreis-Klasse
class Circle extends Shape {
  protected radius: number;

  constructor(radius: number, color: string) {
    super(color);

    this.radius = radius;
  }

  public getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

export class Main {
  private circle: Circle = new Circle(2, 'red');
  private rectangle: Rectangle = new Rectangle(4, 5, 'blue');

  private totalArea: number;

  constructor() {
    const shapes: Shape[] = [this.circle, this.rectangle];

    this.totalArea = this.getTotalArea(shapes);
  }
  public getTotalArea(shapes: Shape[]): number {
    let totalArea = 0;

    for (const shape of shapes) {
      totalArea += shape.getArea();
    }

    return totalArea;
  }
}
