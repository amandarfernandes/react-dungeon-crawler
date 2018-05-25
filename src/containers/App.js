import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import Header from '../components/Header';
import Game from './Game';
import Footer from '../components/Footer';
import * as actions from '../store/actions';
import Sidebar from '../components/Sidebar';

const App = ({ player, gameboard, toggle_fog, message }) => {
  //console.log('gameboard', gameboard);
  const { dungeon, fogMode, gameLevel } = gameboard;
  //console.log(fogMode);
  return (
    <div className="App">
      <Header level={gameLevel} />
      <main>
        <Game />
        <Sidebar
          player={player}
          dungeon={dungeon}
          fogmode={fogMode}
          setFogMode={() => toggle_fog()}
          message={message.message}
        />
      </main>
      <Footer />
    </div>
  );
};
const mapDispatchToProps = ({ player, gameboard, message }) => ({
  player,
  gameboard,
  message
});
export default connect(mapDispatchToProps, actions)(App);
