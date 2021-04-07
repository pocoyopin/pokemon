import React from 'react'

import Header from './components/Header'
import Navigation from './components/Navigation'
import Body from './components/Body'
import './App.css'
import {ContextProvider} from './ContextProvider'

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Header />
        <Body />
        <Navigation />
      </div>
    </ContextProvider>
  );
}

export default App;
