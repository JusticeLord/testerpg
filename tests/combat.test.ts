import { describe, it, expect, beforeEach } from 'vitest';
import { GameState } from '../src/core/GameState';
import { EventEmitter } from '../src/core/EventEmitter';
import { GameMap } from '../src/map/GameMap';
import { CombatSystem } from '../src/systems/CombatSystem';
import { AISystem } from '../src/systems/AISystem';

describe('CombatSystem & AISystem', () => {
  let state: GameState;
  let combat: CombatSystem;
  let ai: AISystem;

  beforeEach(() => {
    const events = new EventEmitter();
    const map = new GameMap();
    state = new GameState(events, map);
    combat = new CombatSystem(state);
    ai = new AISystem(state);
  });

  it('deve acertar um inimigo no alcance do golpe e reduzir seu HP', () => {
    const slime = state.map.enemies[0];
    // Posiciona o jogador ao lado do inimigo olhando para ele
    state.player.x = slime.x - 20;
    state.player.y = slime.y;
    state.player.direction = 'right';

    const hpBefore = slime.hp;
    const attacked = combat.attack();
    expect(attacked).toBe(true);
    expect(slime.hp).toBe(hpBefore - state.player.stats.attackPower);
  });

  it('deve derrotar o inimigo ao zerar o HP e emitir evento', () => {
    const slime = state.map.enemies[0];
    slime.hp = 10;
    state.player.x = slime.x - 20;
    state.player.y = slime.y;
    state.player.direction = 'right';

    let defeated = false;
    state.events.on('enemy_defeated', (payload) => {
      if (payload.id === slime.id) {
        defeated = true;
      }
    });

    combat.attack();
    expect(slime.hp).toBe(0);
    expect(slime.isAlive).toBe(false);
    expect(defeated).toBe(true);
  });

  it('deve causar dano ao jogador quando o monstro atacar e acionar game over se HP zerar', () => {
    const slime = state.map.enemies[0];
    // Posiciona o monstro em contato com o jogador
    slime.x = state.player.x;
    slime.y = state.player.y;
    slime.lastAttackTime = slime.attackCooldown; // pronto para atacar

    state.player.stats.hp = 8;

    ai.update(0.1);
    expect(state.player.stats.hp).toBe(0);
    expect(state.isGameOver).toBe(true);
  });
});
