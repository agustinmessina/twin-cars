import React from 'react';

class Option extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <input type="range" min={this.props.min} max={this.props.max} value={this.props.value} step={this.props.step} onChange={this.props.onChange} />
        <span>{this.props.value}</span>
      </div>
    );
  }
}

class ConfigMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [
        {
          name: 'Dificultad',
          min: 1,
          max: 10,
          value: props.gameSettings.difficulty,
        },
        {
          name: 'Velocidad',
          min: 1,
          max: 5,
          value: props.gameSettings.speed,
        },
        {
          name: 'Duracion (segundos)',
          min: 30,
          max: 180,
          value: props.gameSettings.duration,
          step: 5,
        },
      ]
    }
  }

  handleChange(event, i) {
    const newValue = event.target.value;
    
    const options = this.state.options.slice();
    options[i].value = newValue;

    this.setState({options});
  }

  getGameSettings() {
    return {
      difficulty: Number(this.state.options[0].value),
      speed: Number(this.state.options[1].value),
      duration: Number(this.state.options[2].value),
    }
  }

  renderOption(i) {
    const option = this.state.options[i];
    return (
      <Option name={option.name} min={option.min} max={option.max} value={option.value} step={option.step} onChange={event => this.handleChange(event, i)} />
    )
  }

  render() {
    return (
      <div>
        {this.renderOption(0)}
        {this.renderOption(1)}
        {this.renderOption(2)}
        <button onClick={() => this.props.onSave(this.getGameSettings())}>Guardar</button>
      </div>
    );
  }
}

export default ConfigMenu;