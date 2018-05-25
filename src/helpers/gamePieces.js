//import dungeonC from './gridConstants.js';
import _ from 'lodash';

export class GamePieces {
  constructor(level = 1) {
    this.gameCharacters = {
      bosses: [],
      enemies: [],
      exits: [],
      potions: [],
      weapons: [],
      player: []
    };
    //console.log(level);
    if (level === 4) {
      this.gameCharacters.bosses.push({
        type: 'boss',
        health: 400,
        level: 5
      });
    }

    if (level < 4) {
      this.gameCharacters.exits.push({
        type: 'exit'
      });
    }

    this.gameCharacters.player = [
      {
        type: 'player'
      }
    ];

    this.gameCharacters.potions = [...Array(4)].fill({
      type: 'potion',
      health: +level * 40
    });

    //console.log(this.gameCharacters.potions);

    this.gameCharacters.enemies = [...Array(6)].fill({
      health: level * 30 + 40,
      type: 'enemy',
      level: _.random(level, _.random(level === 1 ? level : level - 1, level + 1))
    });

    const weaponType = [
      { name: 'knife', damage: 12, image: '🗡️' },
      { name: 'sword', damage: 17, image: '⚔️' },
      { name: 'bow', damage: 15, image: '🏹' },
      { name: 'rifle', damage: 25, image: 'rifle' },
      { name: 'submachinegun', damage: 33, image: '💥' },
      { name: 'machinegun', damage: 35, image: '💥💥' },
      { name: 'glock', damage: 22, image: '🔫 ' },
      { name: 'bazooka', damage: 39, image: '🚀' }
    ];

    const weaponLevel = weaponType.filter(
      wt => wt.damage < level * 10 + 10 && wt.damage > level * 10 - 10
    );

    this.gameCharacters.weapons = weaponLevel.map(wt => ({ ...wt, type: 'weapon' }));
    //console.log(this.gameCharacters.weapons);
  }
}
