import { Direction, CharacterStats, BoxCollider } from '../types/entity';
import { InventorySlot } from '../types/item';
import { QuestInstance } from '../types/quest';
import { DialogueNode } from '../types/dialogue';
import { GameMap } from '../map/GameMap';
import { EventEmitter } from './EventEmitter';

export interface FloatingText {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
  maxLife: number;
}

export class GameState {
  public events: EventEmitter;
  public map: GameMap;

  // Jogador
  public player = {
    x: 200,
    y: 300,
    width: 24,
    height: 24,
    direction: 'down' as Direction,
    isMoving: false,
    stats: {
      hp: 100,
      maxHp: 100,
      attackPower: 10,
      speed: 130
    } as CharacterStats,
    isAttacking: false,
    attackTimer: 0,
    attackCooldown: 0.35,
    attackHitbox: null as BoxCollider | null
  };

  // Inventário
  public inventory: InventorySlot[] = [];

  // Missões
  public activeQuests: Map<string, QuestInstance> = new Map();
  public completedQuestIds: Set<string> = new Set();

  // Diálogo ativo
  public activeDialogue: {
    node: DialogueNode | null;
    npcId: string | null;
  } = {
    node: null,
    npcId: null
  };

  // Estado da UI e do Jogo
  public isInventoryOpen = false;
  public isGameOver = false;
  public isVictory = false;

  // Textos flutuantes de dano e status
  public floatingTexts: FloatingText[] = [];
  private textCounter = 0;

  constructor(events: EventEmitter, map: GameMap) {
    this.events = events;
    this.map = map;
    this.player.x = map.playerSpawn.x;
    this.player.y = map.playerSpawn.y;
  }

  public getPlayerCollider(): BoxCollider {
    return {
      x: this.player.x - this.player.width / 2,
      y: this.player.y - this.player.height / 2,
      width: this.player.width,
      height: this.player.height
    };
  }

  public addFloatingText(x: number, y: number, text: string, color = '#ff4444', duration = 0.8): void {
    const id = `ftext_${++this.textCounter}`;
    this.floatingTexts.push({
      id,
      x,
      y,
      text,
      color,
      life: duration,
      maxLife: duration
    });
  }

  public updateFloatingTexts(deltaSeconds: number): void {
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.life -= deltaSeconds;
      ft.y -= 25 * deltaSeconds; // Flutua suavemente para cima
      if (ft.life <= 0) {
        this.floatingTexts.splice(i, 1);
      }
    }
  }

  public resetPlayer(): void {
    this.player.x = this.map.playerSpawn.x;
    this.player.y = this.map.playerSpawn.y;
    this.player.stats.hp = this.player.stats.maxHp;
    this.player.isAttacking = false;
    this.isGameOver = false;
    this.events.emit('player_respawned');
  }
}
