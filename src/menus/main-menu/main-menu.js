import React from 'react';
import './main-menu.css';
import ConfigMenu from '../config-menu/config-menu';
import GameComponent from '../../game/game-component';

class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameSettings: {
        speed: 4,
        difficulty: 3,
        duration: 10,
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

  // handleGameFinished() {
  //   this.setState({
  //     inGame: false,
  //   })
  // }

  render() {
    return (
      <div>
        {!this.state.inCofigMenu && !this.state.inGame &&
          <div>
            <button onClick={() => this.handlePlayClick()}>Jugar</button>
            <button onClick={() => this.handleConfigClick()}>Configurar</button>
          </div>
        }
        {this.state.inCofigMenu &&
          <ConfigMenu gameSettings={this.state.gameSettings} onSave={settings => this.handleSave(settings)} />
        }
        {this.state.inGame &&
          <GameComponent gameSettings={this.state.gameSettings} />
        }
      </div>
    )
  }
}

export default MainMenu;