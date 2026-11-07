import { Application, Container } from 'pixi.js';
import { GameMap } from './map/GameMap';
import { GameState } from './core/GameState';
import { EventEmitter } from './core/EventEmitter';
import { Camera } from './core/Camera';
import { InputManager } from './core/InputManager';
import { DataManager } from './data/DataManager';

// Sistemas
import { MovementSystem } from './systems/MovementSystem';
import { CombatSystem } from './systems/CombatSystem';
import { GatheringSystem } from './systems/GatheringSystem';
import { InventorySystem } from './systems/InventorySystem';
import { CraftingSystem } from './systems/CraftingSystem';
import { QuestSystem } from './systems/QuestSystem';
import { DialogueSystem } from './systems/DialogueSystem';
import { InteractionSystem } from './systems/InteractionSystem';
import { AISystem } from './systems/AISystem';

// Renderizadores
import { ProceduralArt } from './render/ProceduralArt';
import { TilemapRenderer } from './render/TilemapRenderer';
import { EntityRenderer } from './render/EntityRenderer';
import { UIRenderer } from './render/UIRenderer';

async function bootstrap() {
  console.log('[XP FORGE] Inicializando Vertical Slice RPG 2D (PixiJS 8)...');

  const app = new Application();
  await app.init({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x0b0e14,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    antialias: false
  });

  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.appendChild(app.canvas);
  }

  // 1. Núcleo e Dados
  const events = new EventEmitter();
  const data = new DataManager();
  const map = new GameMap();
  const state = new GameState(events, map);
  const camera = new Camera(
    window.innerWidth,
    window.innerHeight,
    map.widthPixels,
    map.heightPixels
  );
  const input = new InputManager();

  // 2. Sistemas
  const movement = new MovementSystem(state);
  const combat = new CombatSystem(state);
  const inventory = new InventorySystem(state);
  const crafting = new CraftingSystem(state, data, inventory);
  const quests = new QuestSystem(state, data);
  const dialogues = new DialogueSystem(state, data, quests);
  const gathering = new GatheringSystem(state, data, inventory);
  const interactions = new InteractionSystem(state, dialogues, gathering, quests);
  const ai = new AISystem(state);

  // Escuta recompensas de itens da quest
  events.on('give_item_reward', (payload) => {
    inventory.addItem(payload.item, payload.quantity);
  });

  // 3. Renderização
  const art = new ProceduralArt();
  const worldContainer = new Container();
  app.stage.addChild(worldContainer);

  const tilemapRenderer = new TilemapRenderer(map, art);
  worldContainer.addChild(tilemapRenderer.container);

  const entityRenderer = new EntityRenderer(state, art);
  worldContainer.addChild(entityRenderer.container);

  const uiRenderer = new UIRenderer(
    state,
    data,
    inventory,
    crafting,
    dialogues,
    interactions
  );

  // 4. Mapeamento de Entradas de Ação
  input.onInteract = () => {
    interactions.interact();
  };

  input.onAttack = () => {
    combat.attack();
  };

  input.onToggleInventory = () => {
    uiRenderer.toggleInventory();
  };

  // 5. Redimensionamento de Janela
  window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    camera.resize(window.innerWidth, window.innerHeight);
  });

  // 6. Game Loop com Pixi Ticker
  app.ticker.add((ticker) => {
    const deltaSeconds = Math.min(0.1, ticker.deltaTime / 60);

    // Entrada e Movimentação
    const moveInput = input.getMovementVector();
    movement.update(deltaSeconds, moveInput);

    // Sistemas de Jogo
    combat.update(deltaSeconds);
    gathering.update(deltaSeconds);
    ai.update(deltaSeconds);
    state.updateFloatingTexts(deltaSeconds);

    // Câmera
    camera.follow(state.player, 0.12);
    worldContainer.x = -Math.round(camera.x);
    worldContainer.y = -Math.round(camera.y);

    // Renderizadores
    entityRenderer.update(deltaSeconds);
    uiRenderer.update();
  });

  console.log('[XP FORGE] Vertical Slice RPG inicializada com sucesso.');
}

window.addEventListener('DOMContentLoaded', () => {
  bootstrap().catch((err) => {
    console.error('[XP FORGE] Erro fatal durante a inicialização:', err);
  });
});
