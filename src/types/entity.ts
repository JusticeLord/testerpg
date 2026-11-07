export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Position {
  x: number;
  y: number;
}

export interface BoxCollider {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CharacterStats {
  hp: number;
  maxHp: number;
  attackPower: number;
  speed: number;
}
