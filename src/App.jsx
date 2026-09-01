// Written by: Simion Cartis

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './Navigation/Navigation'
import Home from './Home/Home'
import About from './About/About'
import Skills from './Skills/Skills'
import Experience from './Experience/Experience'
import Projects from './Projects/Projects'
import Contact from './Contact/Contact'
//TODO linkedin image has a white background, get rid of it
//TODO if you are on a project demo link, and you try to click a nav link, it focuses on the project demo link instead. Need to fix
//TODO demo link for projects should be the entire card, not just the image
//TODO test emails

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Home />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>

  );
}

export default App
