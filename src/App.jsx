// Written by: Simion Cartis

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './Navigation/Navigation'
import Home from './Home/Home'
import About from './About/About'
import Skills from './Skills/Skills'
import Experience from './Experience/Experience'
import Projects from './Projects/Projects'
import Contact from './Contact/Contact'
import Footer from './Footer/Footer'
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
      <footer>
        <Footer />
      </footer>
    </>

  );
}

export default App
