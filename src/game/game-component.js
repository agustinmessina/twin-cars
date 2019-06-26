import React from 'react';
import sketch from './sketch-components/sketch';
import P5Wrapper from 'react-p5-wrapper';

class GameComponent extends React.Component {
  render() {
    return (
      <div>
        <P5Wrapper sketch={sketch} gameSettings={this.props.gameSettings} />
      </div>
    );
  }
}

export default GameComponent;