import { Position, BoxCollider } from '../types/entity';
import { ResourceNode } from '../types/item';

export interface NPCData {
  id: string;
  name: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  defaultDialogueId: string;
  spriteKey: string;
}

export interface EnemyData {
  id: string;
  typeId: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  hp: number;
  maxHp: number;
  attackPower: number;
  speed: number;
  aggroRange: number;
  attackRange: number;
  attackCooldown: number;
  lastAttackTime: number;
  isAlive: boolean;
  spawnPoint: Position;
  spriteKey: string;
}

export class GameMap {
  public readonly tileSize = 32;
  public readonly widthInTiles = 32; // 1024 px
  public readonly heightInTiles = 24; // 768 px

  // Matriz de colisão (true = bloqueado / intransponível)
  public collisionGrid: boolean[][];

  // Matriz visual de tiles (0 = grama, 1 = caminho, 2 = água, 3 = árvore/bloqueio, 4 = rocha/parede)
  public tileGrid: number[][];

  public playerSpawn: Position = { x: 200, y: 300 };

  public npcs: NPCData[] = [];
  public resourceNodes: ResourceNode[] = [];
  public enemies: EnemyData[] = [];

  constructor() {
    this.collisionGrid = Array.from({ length: this.heightInTiles }, () =>
      Array(this.widthInTiles).fill(false)
    );
    this.tileGrid = Array.from({ length: this.heightInTiles }, () =>
      Array(this.widthInTiles).fill(0)
    );

    this.buildMap();
    this.spawnEntities();
  }

  public get widthPixels(): number {
    return this.widthInTiles * this.tileSize;
  }

  public get heightPixels(): number {
    return this.heightInTiles * this.tileSize;
  }

  private buildMap(): void {
    // 1. Bordas do mapa intransponíveis (árvores densas ou rochas)
    for (let x = 0; x < this.widthInTiles; x++) {
      this.setBlocked(x, 0, 3);
      this.setBlocked(x, this.heightInTiles - 1, 3);
    }
    for (let y = 0; y < this.heightInTiles; y++) {
      this.setBlocked(0, y, 3);
      this.setBlocked(this.widthInTiles - 1, y, 3);
    }

    // 2. Caminhos de terra na aldeia
    for (let x = 4; x <= 16; x++) {
      this.setTile(x, 9, 1); // Caminho leste-oeste central
    }
    for (let y = 4; y <= 14; y++) {
      this.setTile(10, y, 1); // Caminho norte-sul da vila
    }
    for (let x = 10; x <= 22; x++) {
      this.setTile(x, 14, 1); // Caminho para a fronteira
    }

    // 3. Rio divisor entre a vila e a clareira selvagem
    for (let x = 12; x < this.widthInTiles - 1; x++) {
      // Ponte de pedra em x = 15..17 (caminho transitável)
      if (x < 14 || x > 16) {
        this.setBlocked(x, 13, 2);
      } else {
        this.setTile(x, 13, 1); // Ponte
      }
    }

    // 4. Montanha / Rochedo no canto nordeste
    for (let x = 24; x < 31; x++) {
      for (let y = 1; y < 7; y++) {
        this.setBlocked(x, y, 4);
      }
    }

    // 5. Arvoredo / Obstáculos decorativos
    this.setBlocked(3, 4, 3);
    this.setBlocked(4, 4, 3);
    this.setBlocked(3, 5, 3);
    this.setBlocked(4, 5, 3);

    this.setBlocked(18, 3, 3);
    this.setBlocked(19, 3, 3);
  }

  private setTile(x: number, y: number, tileType: number): void {
    if (x >= 0 && x < this.widthInTiles && y >= 0 && y < this.heightInTiles) {
      this.tileGrid[y][x] = tileType;
    }
  }

  private setBlocked(x: number, y: number, tileType: number): void {
    if (x >= 0 && x < this.widthInTiles && y >= 0 && y < this.heightInTiles) {
      this.tileGrid[y][x] = tileType;
      this.collisionGrid[y][x] = true;
    }
  }

  private spawnEntities(): void {
    // 3 NPCs obrigatórios
    this.npcs = [
      {
        id: 'npc_elder',
        name: 'Ancião Eldrin',
        title: 'Líder do Conselho',
        x: 180,
        y: 260,
        width: 32,
        height: 32,
        defaultDialogueId: 'elder_initial',
        spriteKey: 'npc_elder'
      },
      {
        id: 'npc_blacksmith',
        name: 'Ferreiro Torin',
        title: 'Mestre Forjador',
        x: 360,
        y: 160,
        width: 32,
        height: 32,
        defaultDialogueId: 'blacksmith_idle',
        spriteKey: 'npc_blacksmith'
      },
      {
        id: 'npc_guard',
        name: 'Guarda Brom',
        title: 'Sentinela da Fronteira',
        x: 480,
        y: 400,
        width: 32,
        height: 32,
        defaultDialogueId: 'guard_locked',
        spriteKey: 'npc_guard'
      }
    ];

    // Recursos para coleta (Madeira, Ervas, Minério)
    this.resourceNodes = [
      // Madeira (Árvores colhíveis)
      {
        id: 'tree_1',
        type: 'wood',
        x: 280,
        y: 120,
        yieldItemId: 'wood',
        yieldQuantity: 1,
        available: true,
        respawnTimeSeconds: 15,
        timer: 0
      },
      {
        id: 'tree_2',
        type: 'wood',
        x: 580,
        y: 140,
        yieldItemId: 'wood',
        yieldQuantity: 1,
        available: true,
        respawnTimeSeconds: 15,
        timer: 0
      },
      {
        id: 'tree_3',
        type: 'wood',
        x: 640,
        y: 200,
        yieldItemId: 'wood',
        yieldQuantity: 1,
        available: true,
        respawnTimeSeconds: 15,
        timer: 0
      },
      {
        id: 'tree_4',
        type: 'wood',
        x: 720,
        y: 120,
        yieldItemId: 'wood',
        yieldQuantity: 1,
        available: true,
        respawnTimeSeconds: 15,
        timer: 0
      },

      // Ervas Medicinais
      {
        id: 'herb_1',
        type: 'herb',
        x: 220,
        y: 440,
        yieldItemId: 'herb',
        yieldQuantity: 1,
        available: true,
        respawnTimeSeconds: 12,
        timer: 0
      },
      {
        id: 'herb_2',
        type: 'herb',
        x: 340,
        y: 460,
        yieldItemId: 'herb',
        yieldQuantity: 1,
        available: true,
        respawnTimeSeconds: 12,
        timer: 0
      },
      {
        id: 'herb_3',
        type: 'herb',
        x: 680,
        y: 340,
        yieldItemId: 'herb',
        yieldQuantity: 1,
        available: true,
        respawnTimeSeconds: 12,
        timer: 0
      },

      // Minério de Ferro (próximo às rochas)
      {
        id: 'ore_1',
        type: 'ore',
        x: 760,
        y: 240,
        yieldItemId: 'ore',
        yieldQuantity: 1,
        available: true,
        respawnTimeSeconds: 20,
        timer: 0
      },
      {
        id: 'ore_2',
        type: 'ore',
        x: 820,
        y: 260,
        yieldItemId: 'ore',
        yieldQuantity: 1,
        available: true,
        respawnTimeSeconds: 20,
        timer: 0
      }
    ];

    // Inimigos: Gosmas da Floresta na área sul da fronteira
    this.enemies = [
      {
        id: 'slime_1',
        typeId: 'forest_slime',
        name: 'Gosma Verde da Floresta',
        x: 560,
        y: 520,
        width: 28,
        height: 28,
        hp: 30,
        maxHp: 30,
        attackPower: 8,
        speed: 55,
        aggroRange: 140,
        attackRange: 32,
        attackCooldown: 1.2,
        lastAttackTime: 0,
        isAlive: true,
        spawnPoint: { x: 560, y: 520 },
        spriteKey: 'enemy_slime'
      },
      {
        id: 'slime_2',
        typeId: 'forest_slime',
        name: 'Gosma Ácida da Floresta',
        x: 680,
        y: 560,
        width: 28,
        height: 28,
        hp: 30,
        maxHp: 30,
        attackPower: 8,
        speed: 60,
        aggroRange: 140,
        attackRange: 32,
        attackCooldown: 1.2,
        lastAttackTime: 0,
        isAlive: true,
        spawnPoint: { x: 680, y: 560 },
        spriteKey: 'enemy_slime'
      },
      {
        id: 'slime_3',
        typeId: 'forest_slime',
        name: 'Gosma Rastejante',
        x: 620,
        y: 640,
        width: 28,
        height: 28,
        hp: 30,
        maxHp: 30,
        attackPower: 8,
        speed: 50,
        aggroRange: 140,
        attackRange: 32,
        attackCooldown: 1.2,
        lastAttackTime: 0,
        isAlive: true,
        spawnPoint: { x: 620, y: 640 },
        spriteKey: 'enemy_slime'
      }
    ];
  }

  /**
   * Checa se um retângulo colide com algum tile intransponível do mapa.
   */
  public isCollidingWithWorld(box: BoxCollider): boolean {
    const minTileX = Math.floor(box.x / this.tileSize);
    const maxTileX = Math.floor((box.x + box.width - 0.01) / this.tileSize);
    const minTileY = Math.floor(box.y / this.tileSize);
    const maxTileY = Math.floor((box.y + box.height - 0.01) / this.tileSize);

    for (let ty = minTileY; ty <= maxTileY; ty++) {
      for (let tx = minTileX; tx <= maxTileX; tx++) {
        if (
          tx < 0 ||
          tx >= this.widthInTiles ||
          ty < 0 ||
          ty >= this.heightInTiles ||
          this.collisionGrid[ty][tx]
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
