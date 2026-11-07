import { GameState } from '../core/GameState';
import { DataManager } from '../data/DataManager';
import { InventorySystem } from '../systems/InventorySystem';
import { CraftingSystem } from '../systems/CraftingSystem';
import { DialogueSystem } from '../systems/DialogueSystem';
import { InteractionSystem } from '../systems/InteractionSystem';

export class UIRenderer {
  private state: GameState;
  private data: DataManager;
  private inventory: InventorySystem;
  private crafting: CraftingSystem;
  private dialogues: DialogueSystem;
  private interactions: InteractionSystem;

  private rootEl: HTMLElement;

  constructor(
    state: GameState,
    data: DataManager,
    inventory: InventorySystem,
    crafting: CraftingSystem,
    dialogues: DialogueSystem,
    interactions: InteractionSystem
  ) {
    this.state = state;
    this.data = data;
    this.inventory = inventory;
    this.crafting = crafting;
    this.dialogues = dialogues;
    this.interactions = interactions;

    let el = document.getElementById('rpg-ui-layer');
    if (!el) {
      el = document.createElement('div');
      el.id = 'rpg-ui-layer';
      document.body.appendChild(el);
    }
    this.rootEl = el;

    this.injectStyles();
    this.renderDOM();
    this.bindEvents();
  }

  private injectStyles(): void {
    if (document.getElementById('rpg-ui-styles')) return;

    const style = document.createElement('style');
    style.id = 'rpg-ui-styles';
    style.textContent = `
      #rpg-ui-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #f0f0f0;
        user-select: none;
        overflow: hidden;
      }
      .ui-interactive {
        pointer-events: auto;
      }
      /* HUD Superior */
      .hud-header {
        position: absolute;
        top: 16px;
        left: 16px;
        right: 16px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .player-stats-card {
        background: rgba(18, 22, 34, 0.88);
        border: 2px solid #3d4a68;
        border-radius: 8px;
        padding: 12px 16px;
        box-shadow: 0 4px 14px rgba(0,0,0,0.5);
        min-width: 220px;
      }
      .hp-bar-bg {
        width: 100%;
        height: 16px;
        background: #331111;
        border-radius: 4px;
        border: 1px solid #552222;
        overflow: hidden;
        margin: 6px 0;
        position: relative;
      }
      .hp-bar-fill {
        height: 100%;
        background: linear-gradient(90deg, #e63946, #ff4d6d);
        transition: width 0.25s ease-out;
      }
      .hp-bar-text {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: bold;
        text-shadow: 0 1px 2px #000;
      }
      .quest-tracker-card {
        background: rgba(18, 22, 34, 0.88);
        border: 2px solid #5c4d28;
        border-radius: 8px;
        padding: 12px 16px;
        max-width: 320px;
        box-shadow: 0 4px 14px rgba(0,0,0,0.5);
      }
      .quest-tracker-title {
        color: #ffcc00;
        font-size: 13px;
        font-weight: bold;
        margin-bottom: 6px;
        border-bottom: 1px solid #443719;
        padding-bottom: 4px;
      }
      .quest-obj-item {
        font-size: 11px;
        margin: 4px 0;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .quest-obj-item.completed {
        color: #70e000;
        text-decoration: line-through;
        opacity: 0.8;
      }

      /* Context Prompt */
      .prompt-box {
        position: absolute;
        bottom: 70px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(10, 14, 23, 0.92);
        border: 2px solid #ffaa00;
        color: #fff;
        padding: 8px 20px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: bold;
        display: none;
        box-shadow: 0 4px 12px rgba(255, 170, 0, 0.3);
      }

      /* Bottom Bar */
      .bottom-bar {
        position: absolute;
        bottom: 12px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(15, 18, 28, 0.85);
        border: 1px solid #2a334d;
        padding: 6px 18px;
        border-radius: 6px;
        font-size: 12px;
        color: #a0aec0;
        display: flex;
        gap: 16px;
      }
      .bottom-bar span strong {
        color: #e2e8f0;
      }

      /* Modais */
      .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.65);
        display: none;
        justify-content: center;
        align-items: center;
      }
      .modal-box {
        background: #141824;
        border: 2px solid #3b4261;
        border-radius: 10px;
        width: 540px;
        max-width: 90%;
        padding: 24px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
      }

      /* Diálogo */
      .dialogue-card {
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        width: 680px;
        max-width: 90%;
        background: rgba(16, 20, 31, 0.95);
        border: 2px solid #4a5568;
        border-radius: 8px;
        padding: 20px;
        display: none;
        box-shadow: 0 8px 24px rgba(0,0,0,0.8);
      }
      .dialogue-speaker {
        color: #ffd166;
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 8px;
      }
      .dialogue-text {
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: 16px;
        color: #e2e8f0;
      }
      .dialogue-choices {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .dialogue-btn {
        background: #252d42;
        border: 1px solid #4c566a;
        color: #fff;
        padding: 8px 14px;
        border-radius: 4px;
        cursor: pointer;
        text-align: left;
        font-size: 13px;
        transition: background 0.15s;
      }
      .dialogue-btn:hover {
        background: #3b4261;
        border-color: #ffaa00;
      }

      /* Inventário & Criação */
      .inv-craft-tabs {
        display: flex;
        gap: 8px;
        border-bottom: 2px solid #2b3245;
        margin-bottom: 16px;
      }
      .tab-btn {
        background: none;
        border: none;
        color: #a0aec0;
        font-size: 14px;
        font-weight: bold;
        padding: 8px 16px;
        cursor: pointer;
        border-bottom: 2px solid transparent;
      }
      .tab-btn.active {
        color: #ffaa00;
        border-color: #ffaa00;
      }
      .inventory-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        gap: 12px;
        max-height: 260px;
        overflow-y: auto;
      }
      .item-slot-card {
        background: #1c2233;
        border: 1px solid #323b52;
        border-radius: 6px;
        padding: 10px;
        text-align: center;
      }
      .item-name {
        font-weight: bold;
        font-size: 12px;
        color: #edf2f7;
      }
      .item-qty {
        font-size: 11px;
        color: #cbd5e1;
        margin: 4px 0;
      }
      .item-use-btn {
        background: #2b6cb0;
        border: none;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 10px;
        cursor: pointer;
        margin-top: 4px;
      }
      .item-use-btn:hover {
        background: #3182ce;
      }
      .craft-recipe-card {
        background: #1c2233;
        border: 1px solid #323b52;
        border-radius: 6px;
        padding: 12px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .craft-btn {
        background: #2e7d32;
        border: none;
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
      }
      .craft-btn:disabled {
        background: #3c4454;
        color: #718096;
        cursor: not-allowed;
      }
      .craft-btn:not(:disabled):hover {
        background: #388e3c;
      }
    `;
    document.head.appendChild(style);
  }

  private renderDOM(): void {
    this.rootEl.innerHTML = `
      <!-- HUD Superior -->
      <div class="hud-header">
        <div class="player-stats-card">
          <div style="font-weight: bold; font-size: 13px; color: #a0aec0;">AVENTUREIRO (HERÓI)</div>
          <div class="hp-bar-bg">
            <div id="ui-hp-fill" class="hp-bar-fill" style="width: 100%;"></div>
            <div id="ui-hp-text" class="hp-bar-text">100 / 100 HP</div>
          </div>
          <div id="ui-attack-power" style="font-size: 11px; color: #cbd5e1;">Ataque: 10 (Punhos/Espada Básica)</div>
        </div>

        <div id="ui-quest-tracker" class="quest-tracker-card">
          <div class="quest-tracker-title">MISSÃO: O Despertar do Vale</div>
          <div id="ui-quest-objectives"></div>
        </div>
      </div>

      <!-- Prompt de Interação Contextual -->
      <div id="ui-prompt-box" class="prompt-box"></div>

      <!-- Barra de Atalhos Inferior -->
      <div class="bottom-bar">
        <span><strong>[WASD / Setas]</strong> Mover</span>
        <span><strong>[Espaço / J]</strong> Atacar</span>
        <span><strong>[E]</strong> Interagir</span>
        <span><strong>[C / I]</strong> Criação & Mochila</span>
      </div>

      <!-- Diálogo com NPCs -->
      <div id="ui-dialogue-card" class="dialogue-card ui-interactive">
        <div id="ui-dialogue-speaker" class="dialogue-speaker"></div>
        <div id="ui-dialogue-text" class="dialogue-text"></div>
        <div id="ui-dialogue-choices" class="dialogue-choices"></div>
      </div>

      <!-- Modal de Inventário e Criação -->
      <div id="ui-inv-modal" class="modal-overlay ui-interactive">
        <div class="modal-box">
          <div class="inv-craft-tabs">
            <button id="tab-inv-btn" class="tab-btn active">MOCHILA</button>
            <button id="tab-craft-btn" class="tab-btn">MESA DE CRIAÇÃO</button>
            <div style="flex: 1;"></div>
            <button id="modal-close-btn" class="tab-btn" style="color: #ff5555;">[X] FECHAR</button>
          </div>

          <div id="tab-inv-content">
            <div id="ui-inventory-grid" class="inventory-grid"></div>
          </div>

          <div id="tab-craft-content" style="display: none;">
            <div id="ui-craft-recipes"></div>
          </div>
        </div>
      </div>

      <!-- Modal de Vitória -->
      <div id="ui-victory-modal" class="modal-overlay ui-interactive">
        <div class="modal-box" style="text-align: center; border-color: #00ffea;">
          <h2 style="color: #00ffea; margin-top: 0;">VALE PACIFICADO!</h2>
          <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
            Parabéns, aventureiro! Você concluiu a vertical slice experimental da XP Forge com louvor!<br>
            Aprendeu as técnicas de forja com Torin, colheu matéria-prima do vale, fabricou equipamentos e derrotou as ameaças florestais.
          </p>
          <div style="margin: 20px 0; background: #1a2233; padding: 12px; border-radius: 6px; font-size: 12px;">
            <div style="color: #ffcc00; font-weight: bold; margin-bottom: 6px;">STATUS DA VERTICAL SLICE</div>
            <div>Todos os 9 sistemas operacionais: 100% OK</div>
            <div>Integração de dados e adaptadores: Ativos</div>
          </div>
          <button id="ui-victory-btn" class="craft-btn" style="background: #00b4d8; font-size: 14px;">Continuar Explorando</button>
        </div>
      </div>

      <!-- Modal de Game Over -->
      <div id="ui-gameover-modal" class="modal-overlay ui-interactive">
        <div class="modal-box" style="text-align: center; border-color: #ff3333;">
          <h2 style="color: #ff3333; margin-top: 0;">VOCÊ FOI DERROTADO!</h2>
          <p style="color: #cbd5e1; font-size: 14px;">As criaturas da floresta superaram suas defesas.</p>
          <button id="ui-respawn-btn" class="craft-btn" style="background: #e63946; font-size: 14px; margin-top: 10px;">Renascer no Vilarejo</button>
        </div>
      </div>
    `;
  }

  private bindEvents(): void {
    // Fechar modal de inventário
    document.getElementById('modal-close-btn')?.addEventListener('click', () => {
      this.toggleInventory(false);
    });

    // Alternância de abas
    const tabInvBtn = document.getElementById('tab-inv-btn');
    const tabCraftBtn = document.getElementById('tab-craft-btn');
    const tabInvContent = document.getElementById('tab-inv-content');
    const tabCraftContent = document.getElementById('tab-craft-content');

    tabInvBtn?.addEventListener('click', () => {
      tabInvBtn.classList.add('active');
      tabCraftBtn?.classList.remove('active');
      if (tabInvContent) tabInvContent.style.display = 'block';
      if (tabCraftContent) tabCraftContent.style.display = 'none';
    });

    tabCraftBtn?.addEventListener('click', () => {
      tabCraftBtn.classList.add('active');
      tabInvBtn?.classList.remove('active');
      if (tabInvContent) tabInvContent.style.display = 'none';
      if (tabCraftContent) tabCraftContent.style.display = 'block';
      this.updateCraftingTab();
    });

    // Botão de respawn
    document.getElementById('ui-respawn-btn')?.addEventListener('click', () => {
      this.state.resetPlayer();
      const goModal = document.getElementById('ui-gameover-modal');
      if (goModal) goModal.style.display = 'none';
    });

    // Botão de vitória
    document.getElementById('ui-victory-btn')?.addEventListener('click', () => {
      const vicModal = document.getElementById('ui-victory-modal');
      if (vicModal) vicModal.style.display = 'none';
    });
  }

  public toggleInventory(force?: boolean): void {
    const invModal = document.getElementById('ui-inv-modal');
    if (!invModal) return;

    this.state.isInventoryOpen = force !== undefined ? force : !this.state.isInventoryOpen;
    invModal.style.display = this.state.isInventoryOpen ? 'flex' : 'none';

    if (this.state.isInventoryOpen) {
      this.updateInventoryTab();
      this.updateCraftingTab();
    }
  }

  public update(): void {
    // 1. Atualiza vida do jogador
    const hp = this.state.player.stats.hp;
    const maxHp = this.state.player.stats.maxHp;
    const hpFill = document.getElementById('ui-hp-fill');
    const hpText = document.getElementById('ui-hp-text');
    if (hpFill && hpText) {
      const pct = Math.max(0, Math.min(100, (hp / maxHp) * 100));
      hpFill.style.width = `${pct}%`;
      hpText.textContent = `${hp} / ${maxHp} HP`;
    }

    // Ataque
    const atkEl = document.getElementById('ui-attack-power');
    if (atkEl) {
      atkEl.textContent = `Ataque: ${this.state.player.stats.attackPower} ${
        this.state.player.stats.attackPower > 10 ? '(Espada Reforçada)' : '(Básico)'
      }`;
    }

    // 2. Atualiza Quest Tracker
    this.updateQuestTracker();

    // 3. Atualiza Prompt de interação
    const promptEl = document.getElementById('ui-prompt-box');
    const interaction = this.interactions.getAvailableInteraction();
    if (promptEl) {
      if (interaction && !this.state.activeDialogue.node) {
        promptEl.style.display = 'block';
        promptEl.textContent = interaction.label;
      } else {
        promptEl.style.display = 'none';
      }
    }

    // 4. Atualiza Diálogo
    this.updateDialogueBox();

    // 5. Game Over e Vitória
    const goModal = document.getElementById('ui-gameover-modal');
    if (goModal) {
      goModal.style.display = this.state.isGameOver ? 'flex' : 'none';
    }

    const vicModal = document.getElementById('ui-victory-modal');
    if (vicModal && this.state.isVictory && !this.victoryDismissed) {
      vicModal.style.display = 'flex';
      this.victoryDismissed = true;
    }
  }

  private victoryDismissed = false;

  private updateQuestTracker(): void {
    const objectivesContainer = document.getElementById('ui-quest-objectives');
    if (!objectivesContainer) return;

    const quest = this.state.activeQuests.get('quest_valley_initiation');
    if (!quest) {
      if (this.state.completedQuestIds.has('quest_valley_initiation')) {
        objectivesContainer.innerHTML = `<div style="color: #70e000; font-weight: bold; font-size: 11px;">✓ MISSÃO CONCLUÍDA!</div>`;
      } else {
        objectivesContainer.innerHTML = `<div style="color: #a0aec0; font-size: 11px;">Fale com o Ancião Eldrin no vilarejo.</div>`;
      }
      return;
    }

    let html = '';
    for (const obj of quest.objectives) {
      const mark = obj.completed ? '✓' : `[${obj.currentAmount}/${obj.requiredAmount}]`;
      const cl = obj.completed ? 'quest-obj-item completed' : 'quest-obj-item';
      html += `<div class="${cl}"><span>${mark}</span> <span>${obj.description}</span></div>`;
    }
    objectivesContainer.innerHTML = html;
  }

  private updateDialogueBox(): void {
    const card = document.getElementById('ui-dialogue-card');
    const speakerEl = document.getElementById('ui-dialogue-speaker');
    const textEl = document.getElementById('ui-dialogue-text');
    const choicesEl = document.getElementById('ui-dialogue-choices');

    const activeNode = this.state.activeDialogue.node;
    if (!card || !speakerEl || !textEl || !choicesEl) return;

    if (!activeNode) {
      card.style.display = 'none';
      return;
    }

    card.style.display = 'block';
    speakerEl.textContent = activeNode.speaker;
    textEl.textContent = activeNode.text;

    choicesEl.innerHTML = '';

    if (activeNode.choices && activeNode.choices.length > 0) {
      activeNode.choices.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.className = 'dialogue-btn';
        btn.textContent = `▸ ${choice.text}`;
        btn.addEventListener('click', () => {
          this.dialogues.selectChoice(idx);
        });
        choicesEl.appendChild(btn);
      });
    } else {
      const btn = document.createElement('button');
      btn.className = 'dialogue-btn';
      btn.textContent = activeNode.next ? '▸ Continuar...' : '▸ [E] Fechar';
      btn.addEventListener('click', () => {
        this.dialogues.advance();
      });
      choicesEl.appendChild(btn);
    }
  }

  private updateInventoryTab(): void {
    const grid = document.getElementById('ui-inventory-grid');
    if (!grid) return;

    if (this.state.inventory.length === 0) {
      grid.innerHTML = `<div style="color: #718096; font-size: 12px; grid-column: 1/-1;">Sua mochila está vazia. Colete madeira, ervas e minérios pelo mapa!</div>`;
      return;
    }

    let html = '';
    this.state.inventory.forEach((slot) => {
      const useBtn =
        slot.item.type === 'CONSUMABLE'
          ? `<button class="item-use-btn" data-item-id="${slot.item.id}">Usar (+40 HP)</button>`
          : slot.item.type === 'EQUIPMENT'
          ? `<button class="item-use-btn" data-item-id="${slot.item.id}">Equipar</button>`
          : '';

      html += `
        <div class="item-slot-card">
          <div class="item-name">${slot.item.name}</div>
          <div class="item-qty">Qtd: ${slot.quantity}</div>
          <div style="font-size: 10px; color: #718096; margin-bottom: 4px;">${slot.item.description}</div>
          ${useBtn}
        </div>
      `;
    });
    grid.innerHTML = html;

    grid.querySelectorAll('.item-use-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const itemId = (e.target as HTMLElement).getAttribute('data-item-id');
        if (itemId) {
          this.inventory.useItem(itemId);
          this.updateInventoryTab();
        }
      });
    });
  }

  private updateCraftingTab(): void {
    const container = document.getElementById('ui-craft-recipes');
    if (!container) return;

    const recipes = this.data.getAllRecipes();
    let html = '';

    recipes.forEach((rec) => {
      const canCraft = this.crafting.canCraft(rec);
      let ingredientsDesc = rec.ingredients
        .map((ing) => {
          const item = this.data.getItem(ing.itemId);
          const current = this.inventory.getItemCount(ing.itemId);
          const color = current >= ing.quantity ? '#70e000' : '#ff4d6d';
          return `<span style="color: ${color};">${item?.name || ing.itemId}: ${current}/${ing.quantity}</span>`;
        })
        .join(' | ');

      html += `
        <div class="craft-recipe-card">
          <div>
            <div style="font-weight: bold; font-size: 13px; color: #ffd166;">${rec.name}</div>
            <div style="font-size: 11px; color: #a0aec0; margin: 4px 0;">${rec.description}</div>
            <div style="font-size: 11px;">Requisitos: ${ingredientsDesc}</div>
          </div>
          <button class="craft-btn" data-recipe-id="${rec.id}" ${canCraft ? '' : 'disabled'}>
            Fabricar
          </button>
        </div>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.craft-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const recipeId = (e.target as HTMLElement).getAttribute('data-recipe-id');
        if (recipeId) {
          this.crafting.craft(recipeId);
          this.updateCraftingTab();
          this.updateInventoryTab();
        }
      });
    });
  }
}
