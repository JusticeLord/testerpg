import { Container, Sprite } from 'pixi.js';
import { GameMap } from '../map/GameMap';
import { ProceduralArt } from './ProceduralArt';

export class TilemapRenderer {
  public container: Container;
  private map: GameMap;
  private art: ProceduralArt;

  constructor(map: GameMap, art: ProceduralArt) {
    this.map = map;
    this.art = art;
    this.container = new Container();

    this.renderMap();
  }

  private renderMap(): void {
    const tileKeys: Record<number, string> = {
      0: 'tile_grass',
      1: 'tile_path',
      2: 'tile_water',
      3: 'tile_tree',
      4: 'tile_rock'
    };

    for (let ty = 0; ty < this.map.heightInTiles; ty++) {
      for (let tx = 0; tx < this.map.widthInTiles; tx++) {
        const tileType = this.map.tileGrid[ty][tx];
        const textureKey = tileKeys[tileType] || 'tile_grass';
        const texture = this.art.getTexture(textureKey);

        const sprite = new Sprite(texture);
        sprite.x = tx * this.map.tileSize;
        sprite.y = ty * this.map.tileSize;
        this.container.addChild(sprite);
      }
    }
  }
}
