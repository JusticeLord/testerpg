import { Position } from '../types/entity';

export class Camera {
  public x = 0;
  public y = 0;
  public viewportWidth: number;
  public viewportHeight: number;
  public worldWidth: number;
  public worldHeight: number;

  constructor(viewportWidth: number, viewportHeight: number, worldWidth: number, worldHeight: number) {
    this.viewportWidth = viewportWidth;
    this.viewportHeight = viewportHeight;
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
  }

  public follow(target: Position, lerpFactor = 0.1): void {
    // Posição desejada centralizando o alvo no viewport
    const targetCamX = target.x - this.viewportWidth / 2;
    const targetCamY = target.y - this.viewportHeight / 2;

    // Suavização (lerp)
    this.x += (targetCamX - this.x) * lerpFactor;
    this.y += (targetCamY - this.y) * lerpFactor;

    // Limites do mundo
    const maxX = Math.max(0, this.worldWidth - this.viewportWidth);
    const maxY = Math.max(0, this.worldHeight - this.viewportHeight);

    this.x = Math.max(0, Math.min(this.x, maxX));
    this.y = Math.max(0, Math.min(this.y, maxY));
  }

  public resize(viewportWidth: number, viewportHeight: number): void {
    this.viewportWidth = viewportWidth;
    this.viewportHeight = viewportHeight;
  }
}
