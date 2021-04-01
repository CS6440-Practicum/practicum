import React from 'react';
import logo from './logo.svg';
import './App.css';
import useAsyncEffect from "use-async-effect";

function App() {

  useAsyncEffect((async () => {
    const userResp = await fetch("/auth/user", {
      credentials: "include"
    });

    console.log(await userResp.json());
  }), [ /* list all dependent variables used in the effect here - props, etc. */ ])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
