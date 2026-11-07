import { Direction } from '../types/entity';

export class InputManager {
  private keysDown: Set<string> = new Set();
  public onInteract?: () => void;
  public onAttack?: () => void;
  public onToggleInventory?: () => void;

  constructor() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  public destroy(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    this.keysDown.clear();
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    // Evitar conflito se o foco estiver em inputs de texto (se houver)
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    const key = e.key.toLowerCase();
    this.keysDown.add(key);

    if (key === 'e' || key === 'enter') {
      this.onInteract?.();
    } else if (key === ' ' || key === 'j') {
      e.preventDefault();
      this.onAttack?.();
    } else if (key === 'i' || key === 'c' || key === 'tab') {
      e.preventDefault();
      this.onToggleInventory?.();
    }
  };

  private handleKeyUp = (e: KeyboardEvent): void => {
    const key = e.key.toLowerCase();
    this.keysDown.delete(key);
  };

  public getMovementVector(): { dx: number; dy: number; direction?: Direction } {
    let dx = 0;
    let dy = 0;

    if (this.keysDown.has('w') || this.keysDown.has('arrowup')) dy -= 1;
    if (this.keysDown.has('s') || this.keysDown.has('arrowdown')) dy += 1;
    if (this.keysDown.has('a') || this.keysDown.has('arrowleft')) dx -= 1;
    if (this.keysDown.has('d') || this.keysDown.has('arrowright')) dx += 1;

    // Normalização diagonal
    if (dx !== 0 && dy !== 0) {
      const invSqrt = 1 / Math.SQRT2;
      dx *= invSqrt;
      dy *= invSqrt;
    }

    let direction: Direction | undefined;
    if (Math.abs(dx) > Math.abs(dy)) {
      direction = dx > 0 ? 'right' : 'left';
    } else if (dy !== 0) {
      direction = dy > 0 ? 'down' : 'up';
    }

    return { dx, dy, direction };
  }
}
