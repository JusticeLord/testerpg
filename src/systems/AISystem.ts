import { GameState } from '../core/GameState';
import { BoxCollider } from '../types/entity';

export class AISystem {
  private state: GameState;

  constructor(state: GameState) {
    this.state = state;
  }

  public update(deltaSeconds: number): void {
    if (this.state.isGameOver || this.state.isVictory) return;

    const px = this.state.player.x;
    const py = this.state.player.y;

    for (const enemy of this.state.map.enemies) {
      if (!enemy.isAlive) continue;

      const dist = Math.hypot(px - enemy.x, py - enemy.y);

      // Comportamento agressivo quando o jogador entra no raio de percepção
      if (dist <= enemy.aggroRange) {
        // Se estiver ao alcance de ataque, ataca
        if (dist <= enemy.attackRange) {
          enemy.lastAttackTime += deltaSeconds;
          if (enemy.lastAttackTime >= enemy.attackCooldown) {
            this.enemyAttack(enemy);
            enemy.lastAttackTime = 0;
          }
        } else {
          // Perseguição em direção ao jogador
          const dirX = (px - enemy.x) / dist;
          const dirY = (py - enemy.y) / dist;
          const moveStep = enemy.speed * deltaSeconds;

          const newX = enemy.x + dirX * moveStep;
          const newY = enemy.y + dirY * moveStep;

          const boxX: BoxCollider = {
            x: newX - enemy.width / 2,
            y: enemy.y - enemy.height / 2,
            width: enemy.width,
            height: enemy.height
          };
          if (!this.state.map.isCollidingWithWorld(boxX)) {
            enemy.x = newX;
          }

          const boxY: BoxCollider = {
            x: enemy.x - enemy.width / 2,
            y: newY - enemy.height / 2,
            width: enemy.width,
            height: enemy.height
          };
          if (!this.state.map.isCollidingWithWorld(boxY)) {
            enemy.y = newY;
          }
        }
      } else {
        // Retorno lento ao ponto de spawn
        const distSpawn = Math.hypot(enemy.spawnPoint.x - enemy.x, enemy.spawnPoint.y - enemy.y);
        if (distSpawn > 10) {
          const dirX = (enemy.spawnPoint.x - enemy.x) / distSpawn;
          const dirY = (enemy.spawnPoint.y - enemy.y) / distSpawn;
          enemy.x += dirX * (enemy.speed * 0.4) * deltaSeconds;
          enemy.y += dirY * (enemy.speed * 0.4) * deltaSeconds;
        }
      }
    }
  }

  private enemyAttack(enemy: any): void {
    const damage = enemy.attackPower;
    this.state.player.stats.hp = Math.max(0, this.state.player.stats.hp - damage);

    this.state.addFloatingText(
      this.state.player.x,
      this.state.player.y - 15,
      `-${damage} HP`,
      '#ff0055',
      0.8
    );

    this.state.events.emit('player_damaged', {
      enemyId: enemy.id,
      damage,
      remainingHp: this.state.player.stats.hp
    });

    if (this.state.player.stats.hp <= 0) {
      this.state.isGameOver = true;
      this.state.events.emit('game_over');
    }
  }
}
