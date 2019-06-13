import React from 'react';
import logo from './logo.svg';
import './App.css';
import sketch from './sketch';
import P5Wrapper from 'react-p5-wrapper';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //     <P5Wrapper sketch={sketch} gameSettings={{hola: 'chau'}}/>
    //   </header>
    // </div>
    <div>
      <P5Wrapper sketch={sketch} />
    </div>
  );
}

export default App;
