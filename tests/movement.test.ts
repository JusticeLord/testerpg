import { describe, it, expect, beforeEach } from 'vitest';
import { GameState } from '../src/core/GameState';
import { EventEmitter } from '../src/core/EventEmitter';
import { GameMap } from '../src/map/GameMap';
import { MovementSystem } from '../src/systems/MovementSystem';

describe('MovementSystem', () => {
  let state: GameState;
  let movement: MovementSystem;

  beforeEach(() => {
    const events = new EventEmitter();
    const map = new GameMap();
    state = new GameState(events, map);
    movement = new MovementSystem(state);
  });

  it('deve mover o jogador em espaço livre', () => {
    state.player.x = 200;
    state.player.y = 300;

    movement.update(0.1, { dx: 1, dy: 0, direction: 'right' });
    expect(state.player.x).toBeGreaterThan(200);
    expect(state.player.isMoving).toBe(true);
    expect(state.player.direction).toBe('right');
  });

  it('deve impedir o jogador de atravessar tiles de colisão (ex: borda do mapa)', () => {
    // Posiciona o jogador encostado no limite esquerdo do mapa (tile 0 bloqueado)
    state.player.x = 33;
    state.player.y = 300;

    // Tenta andar para a esquerda em direção à parede
    movement.update(0.5, { dx: -1, dy: 0, direction: 'left' });
    // Não deve ultrapassar para dentro da parede (tile 0 = 0..32px)
    expect(state.player.x).toBeGreaterThanOrEqual(32);
  });
});
