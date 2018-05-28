import _ from 'lodash';
import * as at from './actionTypes';
import { batchActions } from 'redux-batched-actions';

import { createDungeon } from '../../helpers/dungeon';
import { newGameBoard } from '../../helpers/gameBoard';

export const toggle_fog = () => ({ type: at.TOGGLE_FOG });
export const restart = () => ({ type: at.RESTART });
export const movePlayer = payload => ({ type: at.MOVE_PLAYER, payload });
export const changeHealth = payload => ({ type: at.CHANGE_HEALTH, payload });
export const addWeapon = payload => ({ type: at.ADD_WEAPON, payload });
export const setMessage = payload => ({ type: at.BOARD_MSG, payload });
export const addXP = xp => ({ type: at.ADD_XP, payload: xp });
export const newLevel = gameLevel => ({ type: at.NEW_LEVEL, payload: gameLevel });

export const createBoard = gameLevel => ({
  type: at.CREATE_BOARD,
  payload: newGameBoard(createDungeon(), gameLevel)
});

export const modifyBoard = (gbPiece, gbPos) => ({
  type: at.MODIFY_BOARD,
  payload: { gbPiece, gbPos }
});

export const playerMoved = coords => {
  return (dispatch, getState) => {
    const actions = [];
    const { gameboard, player } = getState();
    const dungeon = gameboard.dungeon;
    const [xPos, yPos] = gameboard.playerPos;
    const [x, y] = coords;
    const destination = dungeon[xPos + x][yPos + y];
    const playertile = dungeon[xPos][yPos];
    if (
      destination.type === 'floor' ||
      destination.type === 'weapon' ||
      destination.type === 'potion'
    ) {
      actions.push(
        modifyBoard({ type: 'floor' }, [xPos, yPos]),
        modifyBoard(playertile, [xPos + x, yPos + y]),
        movePlayer([xPos + x, yPos + y])
      );
    }

    switch (destination.type) {
      case 'weapon':
        actions.push(addWeapon(destination), setMessage(`You collected a ${destination.name}`));
        break;
      case 'potion':
        actions.push(
          changeHealth(player.health + destination.health),
          setMessage(`You gained health! Health is now ${player.health + destination.health}`)
        );
        break;
      case 'exit':
        actions.push(setMessage(`Player is going to Level ${gameboard.gameLevel + 1}`));
        const newLevelActions = [
          newLevel(gameboard.gameLevel + 1),
          createBoard(gameboard.gameLevel + 1)
        ];
        setTimeout(() => dispatch(batchActions(newLevelActions)), 4000);
        break;
      case 'boss':
      case 'enemy':
        const { weapon, xp, health } = player;
        const canDamage = Math.floor(weapon.damage * _.random(1, 1.5) * Math.floor(xp / 50));
        destination.health -= canDamage;

        //enemy eliminated
        if (destination.health <= 0) {
          //add XP and move player
          console.log(destination);
          if (destination.type === 'boss') {
            actions.push(
              setMessage('You defeated the Boss and won the game! '),
              modifyBoard({ type: 'floor' }, [xPos, yPos]),
              modifyBoard(playertile, [xPos + x, yPos + y]),
              movePlayer([xPos + x, yPos + y])
            );

            const restartGame = [restart(), newLevel(1), createBoard(1)];
            setTimeout(() => dispatch(batchActions(restartGame)), 5000);
          } else {
            actions.push(
              setMessage('You defeated the enemy and gained XP'),
              addXP(xp + 50),
              modifyBoard({ type: 'floor' }, [xPos, yPos]),
              modifyBoard(playertile, [xPos + x, yPos + y]),
              movePlayer([xPos + x, yPos + y])
            );
          }
        } else {
          const playerDamaged = Math.floor(_.random(4, 10) * gameboard.gameLevel);
          actions.push(
            setMessage(`You sustained ${playerDamaged} damage`),
            modifyBoard(destination, [xPos + x, yPos + y]),
            changeHealth(health - playerDamaged)
          );
          //player has died if health  <=0
          if (health - playerDamaged <= 0) {
            dispatch(changeHealth(0), setMessage('You Lost!!! Restarting Game...'));
            const restartGame = [restart(), newLevel(1), createBoard(1)];
            setTimeout(() => dispatch(batchActions(restartGame)), 5000);
            return;
          }
        }
        break;
      default:
        break;
    }
    //console.log(actions);
    dispatch(batchActions(actions));
    //console.log(getState());
  };
};
