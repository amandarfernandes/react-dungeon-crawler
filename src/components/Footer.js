import React, { Component } from 'react';

class Footer extends Component {
  state = {
    instructions: [
      'Use Arrow Keys to move Player',
      'Defeat Enemies (🔺) to gain XP',
      'Pick up weapons (X) to increase damage',
      'Some weapons are more powerful than others',
      'Exits (◽ ) will level you up',
      'Potions (⭐) increase your health'
    ],
    index: 0,
    intervalId: null
  };

  componentDidMount() {
    let ctr = 1;

    const intervalId = setInterval(() => {
      if (ctr === this.state.instructions.length) ctr = 0;
      this.setState({ index: ctr });
      ctr++;
    }, 9000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  render() {
    const { instructions, index } = this.state;
    return (
      <div className="footer">
        <p style={{ color: 'red' }}>{instructions[index]}</p>
      </div>
    );
  }
}

export default Footer;
