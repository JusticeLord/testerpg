import { Texture } from 'pixi.js';

/**
 * Gerador de texturas procedurais em pixel art temporárias [TEMPORARY_TEST_ART].
 * Utilizado para isolar a dependência do departamento de arte até a disponibilização do manifesto oficial.
 */
export class ProceduralArt {
  private textures: Map<string, Texture> = new Map();

  public getTexture(key: string): Texture {
    const cached = this.textures.get(key);
    if (cached) return cached;

    const canvas = this.createCanvasForKey(key);
    const texture = Texture.from(canvas);
    this.textures.set(key, texture);
    return texture;
  }

  private createCanvasForKey(key: string): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;

    if (key.startsWith('tile_')) {
      canvas.width = 32;
      canvas.height = 32;
      this.drawTile(ctx, key);
    } else if (key.startsWith('npc_')) {
      canvas.width = 32;
      canvas.height = 32;
      this.drawNpc(ctx, key);
    } else if (key === 'player_down' || key === 'player_up' || key === 'player_left' || key === 'player_right') {
      canvas.width = 32;
      canvas.height = 32;
      this.drawPlayer(ctx, key);
    } else if (key === 'enemy_slime') {
      canvas.width = 28;
      canvas.height = 28;
      this.drawSlime(ctx);
    } else if (key.startsWith('resource_')) {
      canvas.width = 32;
      canvas.height = 32;
      this.drawResource(ctx, key);
    } else if (key === 'slash_effect') {
      canvas.width = 32;
      canvas.height = 32;
      this.drawSlash(ctx);
    } else {
      // Fallback
      canvas.width = 32;
      canvas.height = 32;
      ctx.fillStyle = '#ff00ff';
      ctx.fillRect(0, 0, 32, 32);
    }

    return canvas;
  }

  private drawTile(ctx: CanvasRenderingContext2D, key: string): void {
    if (key === 'tile_grass') {
      ctx.fillStyle = '#4c8c36';
      ctx.fillRect(0, 0, 32, 32);
      // Detalhes da grama
      ctx.fillStyle = '#5ca342';
      ctx.fillRect(4, 6, 2, 4);
      ctx.fillRect(18, 12, 2, 4);
      ctx.fillRect(10, 22, 2, 4);
      ctx.fillRect(24, 26, 2, 4);
      ctx.fillStyle = '#3c702a';
      ctx.fillRect(8, 16, 2, 2);
      ctx.fillRect(22, 4, 2, 2);
    } else if (key === 'tile_path') {
      ctx.fillStyle = '#9c7a52';
      ctx.fillRect(0, 0, 32, 32);
      ctx.fillStyle = '#b38d5f';
      ctx.fillRect(2, 2, 12, 10);
      ctx.fillRect(16, 14, 14, 12);
      ctx.fillStyle = '#826441';
      ctx.fillRect(14, 0, 4, 32);
    } else if (key === 'tile_water') {
      ctx.fillStyle = '#3277a8';
      ctx.fillRect(0, 0, 32, 32);
      ctx.fillStyle = '#4fa3d1';
      ctx.fillRect(2, 6, 12, 3);
      ctx.fillRect(18, 18, 10, 3);
      ctx.fillStyle = '#205880';
      ctx.fillRect(0, 0, 32, 2);
    } else if (key === 'tile_tree') {
      // Copa e tronco da árvore
      ctx.fillStyle = '#4c8c36';
      ctx.fillRect(0, 0, 32, 32);
      ctx.fillStyle = '#24591f';
      ctx.beginPath();
      ctx.arc(16, 12, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#32752c';
      ctx.beginPath();
      ctx.arc(14, 10, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#614022';
      ctx.fillRect(13, 20, 6, 10);
    } else if (key === 'tile_rock') {
      ctx.fillStyle = '#5c636e';
      ctx.fillRect(0, 0, 32, 32);
      ctx.fillStyle = '#7a8391';
      ctx.fillRect(4, 4, 24, 24);
      ctx.fillStyle = '#42474f';
      ctx.fillRect(6, 20, 20, 8);
    }
  }

  private drawPlayer(ctx: CanvasRenderingContext2D, key: string): void {
    // Sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(16, 28, 8, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Túnica do herói (Azul / Dourado)
    ctx.fillStyle = '#2a52be';
    ctx.fillRect(10, 14, 12, 10);

    // Cabeça / Rosto
    ctx.fillStyle = '#f5cda7';
    ctx.fillRect(11, 6, 10, 8);

    // Cabelo castanho
    ctx.fillStyle = '#653b1b';
    ctx.fillRect(10, 4, 12, 4);

    // Olhos e detalhes conforme a direção
    ctx.fillStyle = '#111111';
    if (key === 'player_down') {
      ctx.fillRect(13, 9, 2, 2);
      ctx.fillRect(17, 9, 2, 2);
    } else if (key === 'player_up') {
      // Visto por trás: apenas cabelo
      ctx.fillStyle = '#653b1b';
      ctx.fillRect(11, 6, 10, 7);
    } else if (key === 'player_left') {
      ctx.fillRect(12, 9, 2, 2);
    } else if (key === 'player_right') {
      ctx.fillRect(18, 9, 2, 2);
    }

    // Pernas / Botas
    ctx.fillStyle = '#3e2723';
    ctx.fillRect(11, 24, 4, 4);
    ctx.fillRect(17, 24, 4, 4);
  }

  private drawNpc(ctx: CanvasRenderingContext2D, key: string): void {
    // Sombra base
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(16, 28, 8, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    if (key === 'npc_elder') {
      // Ancião com túnica púrpura e barba branca
      ctx.fillStyle = '#582b75';
      ctx.fillRect(9, 12, 14, 14);
      ctx.fillStyle = '#f5cda7';
      ctx.fillRect(11, 6, 10, 7);
      // Barba branca
      ctx.fillStyle = '#e6e6e6';
      ctx.fillRect(11, 10, 10, 6);
      ctx.fillRect(13, 16, 6, 4);
      // Bastão
      ctx.fillStyle = '#8b5a2b';
      ctx.fillRect(6, 4, 2, 24);
    } else if (key === 'npc_blacksmith') {
      // Ferreiro com avental de couro e bigode
      ctx.fillStyle = '#8b4513';
      ctx.fillRect(9, 12, 14, 14);
      ctx.fillStyle = '#333333'; // Avental
      ctx.fillRect(11, 15, 10, 11);
      ctx.fillStyle = '#e8be99';
      ctx.fillRect(11, 6, 10, 7);
      // Cabelo preto e bandana vermelha
      ctx.fillStyle = '#cc2222';
      ctx.fillRect(10, 4, 12, 3);
      // Martelo na mão
      ctx.fillStyle = '#888888';
      ctx.fillRect(24, 12, 6, 4);
      ctx.fillStyle = '#553311';
      ctx.fillRect(26, 16, 2, 10);
    } else if (key === 'npc_guard') {
      // Guarda com armadura prateada e elmo com pluma
      ctx.fillStyle = '#9e9e9e';
      ctx.fillRect(9, 12, 14, 14);
      ctx.fillStyle = '#b0bec5'; // Peitoral
      ctx.fillRect(11, 14, 10, 10);
      // Elmo
      ctx.fillStyle = '#78909c';
      ctx.fillRect(10, 5, 12, 8);
      // Visor
      ctx.fillStyle = '#111111';
      ctx.fillRect(12, 9, 8, 2);
      // Pluma vermelha
      ctx.fillStyle = '#e53935';
      ctx.fillRect(15, 1, 3, 4);
      // Lança
      ctx.fillStyle = '#bdbdbd';
      ctx.fillRect(25, 2, 2, 26);
      ctx.fillStyle = '#e0e0e0';
      ctx.fillRect(24, 0, 4, 3);
    }
  }

  private drawSlime(ctx: CanvasRenderingContext2D): void {
    // Sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.ellipse(14, 24, 10, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Corpo da gosma verde
    ctx.fillStyle = '#38b000';
    ctx.beginPath();
    ctx.ellipse(14, 17, 10, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Brilho gelatinoso
    ctx.fillStyle = '#70e000';
    ctx.beginPath();
    ctx.ellipse(11, 13, 5, 4, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Olhos
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, 15, 3, 3);
    ctx.fillRect(16, 15, 3, 3);
    ctx.fillStyle = '#111111';
    ctx.fillRect(11, 16, 2, 2);
    ctx.fillRect(17, 16, 2, 2);
  }

  private drawResource(ctx: CanvasRenderingContext2D, key: string): void {
    if (key === 'resource_wood') {
      // Cepo / Tronco cortável
      ctx.fillStyle = '#5c3a21';
      ctx.fillRect(8, 14, 16, 12);
      ctx.fillStyle = '#a67b5b';
      ctx.beginPath();
      ctx.ellipse(16, 14, 8, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#3a7d2c';
      ctx.fillRect(12, 8, 8, 5); // Folhagens brotando
    } else if (key === 'resource_herb') {
      // Arbusto de ervas medicinais com flores púrpuras
      ctx.fillStyle = '#2d6a4f';
      ctx.beginPath();
      ctx.arc(16, 18, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#52b788';
      ctx.beginPath();
      ctx.arc(14, 15, 6, 0, Math.PI * 2);
      ctx.fill();
      // Flores
      ctx.fillStyle = '#9d4edd';
      ctx.fillRect(11, 13, 3, 3);
      ctx.fillRect(19, 16, 3, 3);
      ctx.fillRect(14, 21, 3, 3);
    } else if (key === 'resource_ore') {
      // Nódulo de rocha com veios de ferro reluzentes
      ctx.fillStyle = '#4a4e69';
      ctx.fillRect(6, 10, 20, 16);
      ctx.fillStyle = '#6c757d';
      ctx.fillRect(8, 12, 16, 12);
      // Veios brilhantes de minério
      ctx.fillStyle = '#e0a96d';
      ctx.fillRect(10, 14, 4, 3);
      ctx.fillRect(18, 18, 5, 3);
      ctx.fillStyle = '#fff3b0';
      ctx.fillRect(11, 15, 2, 1);
      ctx.fillRect(19, 19, 2, 1);
    }
  }

  private drawSlash(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(16, 16, 12, -0.6 * Math.PI, 0.4 * Math.PI);
    ctx.stroke();

    ctx.strokeStyle = '#ffee55';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(16, 16, 10, -0.5 * Math.PI, 0.3 * Math.PI);
    ctx.stroke();
  }
}
