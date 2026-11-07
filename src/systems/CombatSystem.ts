import { GameState } from '../core/GameState';
import { BoxCollider } from '../types/entity';
import { EnemyData } from '../map/GameMap';

export class CombatSystem {
  private state: GameState;

  constructor(state: GameState) {
    this.state = state;
  }

  public update(deltaSeconds: number): void {
    const player = this.state.player;

    if (player.attackTimer > 0) {
      player.attackTimer -= deltaSeconds;
      if (player.attackTimer <= 0) {
        player.isAttacking = false;
        player.attackHitbox = null;
      }
    }
  }

  public attack(): boolean {
    const player = this.state.player;

    if (
      player.isAttacking ||
      player.attackTimer > 0 ||
      this.state.activeDialogue.node ||
      this.state.isGameOver
    ) {
      return false;
    }

    player.isAttacking = true;
    player.attackTimer = player.attackCooldown;

    // Calcula o hitbox do golpe baseado na direção do jogador
    const reach = 28;
    const size = 30;
    let hx = player.x;
    let hy = player.y;

    switch (player.direction) {
      case 'up':
        hy -= reach;
        break;
      case 'down':
        hy += reach;
        break;
      case 'left':
        hx -= reach;
        break;
      case 'right':
        hx += reach;
        break;
    }

    const hitbox: BoxCollider = {
      x: hx - size / 2,
      y: hy - size / 2,
      width: size,
      height: size
    };
    player.attackHitbox = hitbox;

    this.state.events.emit('player_attacked', {
      direction: player.direction,
      hitbox
    });

    // Detecta inimigos no raio do golpe
    for (const enemy of this.state.map.enemies) {
      if (!enemy.isAlive) continue;

      const enemyBox: BoxCollider = {
        x: enemy.x - enemy.width / 2,
        y: enemy.y - enemy.height / 2,
        width: enemy.width,
        height: enemy.height
      };

      if (this.boxesIntersect(hitbox, enemyBox)) {
        this.hitEnemy(enemy);
      }
    }

    return true;
  }

  private hitEnemy(enemy: EnemyData): void {
    const damage = this.state.player.stats.attackPower;
    enemy.hp = Math.max(0, enemy.hp - damage);

    // Efeito de repulsão (knockback)
    const knockDist = 14;
    switch (this.state.player.direction) {
      case 'up':
        enemy.y -= knockDist;
        break;
      case 'down':
        enemy.y += knockDist;
        break;
      case 'left':
        enemy.x -= knockDist;
        break;
      case 'right':
        enemy.x += knockDist;
        break;
    }

    this.state.addFloatingText(enemy.x, enemy.y - 15, `-${damage}`, '#ff2222', 0.7);

    if (enemy.hp <= 0) {
      enemy.isAlive = false;
      this.state.addFloatingText(enemy.x, enemy.y - 25, 'DERROTADO!', '#ffdd00', 1.2);
      this.state.events.emit('enemy_defeated', {
        id: enemy.id,
        typeId: enemy.typeId,
        name: enemy.name
      });
    }
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
