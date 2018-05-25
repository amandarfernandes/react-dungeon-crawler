import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import _ from 'lodash';

import Row from '../components/Row';

class Game extends Component {
  keyDown(e) {
    switch (e.keyCode) {
      case 37:
        //move left
        this.props.playerMoved([0, -1]);
        break;
      case 38:
        //move up
        this.props.playerMoved([-1, 0]);
        break;
      case 39:
        //move right
        this.props.playerMoved([0, 1]);
        break;
      case 40:
        //move down
        this.props.playerMoved([1, 0]);
        break;
      default:
    }
    e.preventDefault();
  }

  componentWillMount() {
    console.log('componentWillMount');
    this.props.newLevel(1);
    this.props.createBoard();
  }

  componentDidMount() {
    window.addEventListener('keydown', _.throttle(this.keyDown.bind(this), 100));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', _.throttle(this.keyDown.bind(this), 100));
  }
  render() {
    const { dungeon, playerPos, gameLevel, fogMode } = this.props.gameboard;
    const rows = dungeon.map((row, rowIndex) => {
      return (
        <Row
          row={row}
          key={'ri' + rowIndex}
          rowIndex={rowIndex}
          playerPos={playerPos}
          level={gameLevel}
          fogMode={fogMode}
        />
      );
    });
    return <div className="container">{rows}</div>;
  }
}
const mapDispatchToProps = ({ player, gameboard }) => ({
  player,
  gameboard
});
export default connect(mapDispatchToProps, actions)(Game);
