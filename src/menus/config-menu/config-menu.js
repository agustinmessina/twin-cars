import React, { useState } from 'react';

function Option({name, min, max, value, step, onChange}) {
  return (
    <div>
      <h3>{name}</h3>
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value} 
        step={step} 
        onChange={onChange}
      />
      <span>{value}</span>
    </div>
  )
}

function ConfigMenu({gameSettings, onSave}) {
  const [options, setOptions] = useState({
    difficulty: {
      name: 'Dificultad',
      min: 1,
      max: 10,
      value: gameSettings.difficulty,
    },
    speed: {
      name: 'Velocidad',
      min: 1,
      max: 5,
      value: gameSettings.speed,
    },
    duration: {
      name: 'Duracion',
      min: 30,
      max: 180,
      value: gameSettings.duration,
      step: 5,
    }
  })

  function getGameSettings() {
    return {
      difficulty: Number(options['difficulty'].value),
      speed: Number(options['speed'].value),
      duration: Number(options['duration'].value),
    }
  }

  function handleChange(event, optionName) {
    const newValue = event.target.value;
    const newOptions = {...options};
    newOptions[optionName].value = newValue;

    setOptions(newOptions);
  }

  function renderOption(optionName) {
    const option = options[optionName];
    
    return (
      <Option 
        name={option.name} 
        min={option.min} 
        max={option.max} 
        value={option.value} 
        step={option.step} 
        onChange={event => handleChange(event, optionName)} 
      />
    )
  }

  return (
    <div>
      {renderOption('difficulty')}
      {renderOption('speed')}
      {renderOption('duration')}
      <button onClick={() => onSave(getGameSettings())}>Guardar</button>
    </div>
  );
}

export default ConfigMenu;