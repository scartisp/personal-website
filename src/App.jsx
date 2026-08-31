// Written by: Simion Cartis

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './Navigation/Navigation'
import Home from './Home/Home'
import About from './About/About'
import Skills from './Skills/Skills'
import Experience from './Experience/Experience'
// import './App.css'

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Home />
        <About />
        <Skills />
        <Experience />
      </main>
    </>

  );
}

export default App
