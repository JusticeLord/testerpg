import { GameState } from '../core/GameState';
import { Direction, BoxCollider } from '../types/entity';

export class MovementSystem {
  private state: GameState;

  constructor(state: GameState) {
    this.state = state;
  }

  public update(deltaSeconds: number, input: { dx: number; dy: number; direction?: Direction }): void {
    const player = this.state.player;

    // Se estiver em diálogo ou morto, não se move
    if (this.state.activeDialogue.node || this.state.isGameOver) {
      player.isMoving = false;
      return;
    }

    if (input.direction) {
      player.direction = input.direction;
    }

    if (input.dx === 0 && input.dy === 0) {
      player.isMoving = false;
      return;
    }

    player.isMoving = true;
    const moveDist = player.stats.speed * deltaSeconds;

    // Tentativa de movimento com deslizamento (resolvendo X e Y separadamente para fluidez)
    const newX = player.x + input.dx * moveDist;
    const newY = player.y + input.dy * moveDist;

    // Teste no eixo X
    const testBoxX: BoxCollider = {
      x: newX - player.width / 2,
      y: player.y - player.height / 2,
      width: player.width,
      height: player.height
    };
    if (!this.state.map.isCollidingWithWorld(testBoxX) && !this.collidesWithNpc(testBoxX)) {
      player.x = newX;
    }

    // Teste no eixo Y
    const testBoxY: BoxCollider = {
      x: player.x - player.width / 2,
      y: newY - player.height / 2,
      width: player.width,
      height: player.height
    };
    if (!this.state.map.isCollidingWithWorld(testBoxY) && !this.collidesWithNpc(testBoxY)) {
      player.y = newY;
    }
  }

  private collidesWithNpc(box: BoxCollider): boolean {
    for (const npc of this.state.map.npcs) {
      const npcBox: BoxCollider = {
        x: npc.x - npc.width / 2,
        y: npc.y - npc.height / 2,
        width: npc.width,
        height: npc.height
      };
      if (this.boxesIntersect(box, npcBox)) {
        return true;
      }
    }
    return false;
  }

  private boxesIntersect(a: BoxCollider, b: BoxCollider): boolean {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }
}
