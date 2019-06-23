import React from 'react';
import './main-menu.css';
import ConfigMenu from '../config-menu/config-menu';
import sketch from '../../sketch';
import P5Wrapper from 'react-p5-wrapper';

class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameSettings: {
        speed: 4,
        difficulty: 3,
        duration: 35,
      },
      inCofigMenu: false,
      inGame: false,
    }
  }

  handleSave(settings) {
    this.setState({
      gameSettings: settings,
      inCofigMenu: false,
    });
  }

  handleConfigClick() {
    this.setState({
      inCofigMenu: true,
    })
  }

  handlePlayClick() {
    this.setState({
      inGame: true,
    })
  }

  render() {
    return (
      <div>
        {!this.state.inCofigMenu && !this.state.inGame &&
          <div>
            <button onClick={this.handlePlayClick.bind(this)}>Jugar</button>
            <button onClick={this.handleConfigClick.bind(this)}>Configurar</button>
          </div>
        }
        {this.state.inCofigMenu &&
          <ConfigMenu gameSettings={this.state.gameSettings} onSave={this.handleSave.bind(this)} />
        }
        {this.state.inGame &&
          <P5Wrapper sketch={sketch} gameSettings={this.state.gameSettings} />
        }
      </div>
    )
  }
}

export default MainMenu;