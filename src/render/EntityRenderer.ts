import { Container, Sprite, Text, TextStyle, Graphics } from 'pixi.js';
import { GameState } from '../core/GameState';
import { ProceduralArt } from './ProceduralArt';

export class EntityRenderer {
  public container: Container;
  private state: GameState;
  private art: ProceduralArt;

  private playerSprite: Sprite;
  private slashSprite: Sprite;
  private npcSprites: Map<string, { container: Container; sprite: Sprite }> = new Map();
  private resourceSprites: Map<string, { container: Container; sprite: Sprite; icon: Text }> = new Map();
  private enemySprites: Map<string, { container: Container; sprite: Sprite; hpBar: Graphics }> = new Map();
  private floatingTextObjects: Map<string, Text> = new Map();

  private animTimer = 0;

  constructor(state: GameState, art: ProceduralArt) {
    this.state = state;
    this.art = art;
    this.container = new Container();

    // 1. Recursos
    this.initResources();

    // 2. NPCs
    this.initNPCs();

    // 3. Inimigos
    this.initEnemies();

    // 4. Jogador
    this.playerSprite = new Sprite(this.art.getTexture('player_down'));
    this.playerSprite.anchor.set(0.5, 0.5);
    this.container.addChild(this.playerSprite);

    // Efeito de corte da espada
    this.slashSprite = new Sprite(this.art.getTexture('slash_effect'));
    this.slashSprite.anchor.set(0.5, 0.5);
    this.slashSprite.visible = false;
    this.container.addChild(this.slashSprite);
  }

  private initResources(): void {
    for (const node of this.state.map.resourceNodes) {
      const c = new Container();
      c.x = node.x;
      c.y = node.y;

      const textureKey = `resource_${node.type}`;
      const sprite = new Sprite(this.art.getTexture(textureKey));
      sprite.anchor.set(0.5, 0.5);
      c.addChild(sprite);

      const labelStyle = new TextStyle({
        fontSize: 10,
        fill: '#ffffff',
        fontFamily: 'monospace',
        stroke: { color: '#000000', width: 2 }
      });
      const icon = new Text({ text: node.type.toUpperCase(), style: labelStyle });
      icon.anchor.set(0.5, 1);
      icon.y = -14;
      c.addChild(icon);

      this.resourceSprites.set(node.id, { container: c, sprite, icon });
      this.container.addChild(c);
    }
  }

  private initNPCs(): void {
    const nameStyle = new TextStyle({
      fontSize: 10,
      fill: '#ffffaa',
      fontFamily: 'monospace',
      fontWeight: 'bold',
      stroke: { color: '#000000', width: 2 }
    });

    for (const npc of this.state.map.npcs) {
      const c = new Container();
      c.x = npc.x;
      c.y = npc.y;

      const sprite = new Sprite(this.art.getTexture(npc.spriteKey));
      sprite.anchor.set(0.5, 0.5);
      c.addChild(sprite);

      const nameTag = new Text({ text: npc.name, style: nameStyle });
      nameTag.anchor.set(0.5, 1);
      nameTag.y = -18;
      c.addChild(nameTag);

      this.npcSprites.set(npc.id, { container: c, sprite });
      this.container.addChild(c);
    }
  }

  private initEnemies(): void {
    for (const enemy of this.state.map.enemies) {
      const c = new Container();
      c.x = enemy.x;
      c.y = enemy.y;

      const sprite = new Sprite(this.art.getTexture(enemy.spriteKey));
      sprite.anchor.set(0.5, 0.5);
      c.addChild(sprite);

      const hpBar = new Graphics();
      c.addChild(hpBar);

      this.enemySprites.set(enemy.id, { container: c, sprite, hpBar });
      this.container.addChild(c);
    }
  }

  public update(deltaSeconds: number): void {
    this.animTimer += deltaSeconds;

    // Atualiza jogador
    const p = this.state.player;
    this.playerSprite.x = p.x;

    // Passo de animação de caminhada
    const bounce = p.isMoving ? Math.sin(this.animTimer * 12) * 2 : 0;
    this.playerSprite.y = p.y + bounce;

    // Atualiza textura da direção do jogador
    this.playerSprite.texture = this.art.getTexture(`player_${p.direction}`);

    // Visual do golpe de ataque
    if (p.isAttacking && p.attackHitbox) {
      this.slashSprite.visible = true;
      this.slashSprite.x = p.attackHitbox.x + p.attackHitbox.width / 2;
      this.slashSprite.y = p.attackHitbox.y + p.attackHitbox.height / 2;
    } else {
      this.slashSprite.visible = false;
    }

    // Atualiza nós de recursos (opacidade quando esgotado)
    for (const node of this.state.map.resourceNodes) {
      const obj = this.resourceSprites.get(node.id);
      if (obj) {
        obj.sprite.alpha = node.available ? 1 : 0.35;
        obj.icon.visible = node.available;
      }
    }

    // Atualiza inimigos
    for (const enemy of this.state.map.enemies) {
      const obj = this.enemySprites.get(enemy.id);
      if (obj) {
        if (!enemy.isAlive) {
          obj.container.visible = false;
        } else {
          obj.container.visible = true;
          obj.container.x = enemy.x;
          obj.container.y = enemy.y;

          // Atualiza barra de vida do monstro
          const hpBar = obj.hpBar;
          hpBar.clear();
          const barWidth = 24;
          const barHeight = 4;
          const barX = -barWidth / 2;
          const barY = -18;

          // Fundo
          hpBar.rect(barX, barY, barWidth, barHeight);
          hpBar.fill({ color: 0x330000 });

          // Vida atual
          const hpPercent = Math.max(0, enemy.hp / enemy.maxHp);
          hpBar.rect(barX, barY, barWidth * hpPercent, barHeight);
          hpBar.fill({ color: 0x00ff00 });
        }
      }
    }

    // Atualiza textos flutuantes
    this.renderFloatingTexts();
  }

  private renderFloatingTexts(): void {
    const currentIds = new Set(this.state.floatingTexts.map((ft) => ft.id));

    // Remove textos que expiraram
    for (const [id, textObj] of this.floatingTextObjects) {
      if (!currentIds.has(id)) {
        this.container.removeChild(textObj);
        textObj.destroy();
        this.floatingTextObjects.delete(id);
      }
    }

    // Atualiza ou cria textos ativos
    for (const ft of this.state.floatingTexts) {
      let textObj = this.floatingTextObjects.get(ft.id);
      if (!textObj) {
        const style = new TextStyle({
          fontSize: 12,
          fill: ft.color,
          fontFamily: 'monospace',
          fontWeight: 'bold',
          stroke: { color: '#000000', width: 3 }
        });
        textObj = new Text({ text: ft.text, style });
        textObj.anchor.set(0.5, 0.5);
        this.container.addChild(textObj);
        this.floatingTextObjects.set(ft.id, textObj);
      }

      textObj.x = ft.x;
      textObj.y = ft.y;
      textObj.alpha = Math.max(0, ft.life / ft.maxLife);
    }
  }
}
