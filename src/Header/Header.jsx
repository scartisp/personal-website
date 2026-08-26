import './header.css'
import githubLogo from '../assets/github-logo.png'
import liLogo from '../assets/li-logo.png'
import downloadIcon from '../assets/download-icon.png'

const Header = () => {
    return (
        <header>
            <nav className='site-header'>
                <a href='#home' className="logo a-link">Simion Cartis</a>
                <ul className='header-list-element header-nav'>
                    <li> <a href='#about' className='a-link'>About</a></li>
                    <li> <a href='#skills' className='a-link'> Skills </a></li>
                    <li>Experience</li>
                    <li>Portfolio</li>
                    <li>Contact</li>
                </ul>
                <ul className='header-list-element header-link-icons'>
                    <li>
                        <a href='https://github.com/scartisp' target="_blank" rel="noreferrer">
                            <img src={githubLogo} className='link-icons' alt='GitHub'></img>
                        </a>
                    </li>
                    <li>
                        <a href='https://www.linkedin.com/in/simioncartis' target="_blank" rel="noreferrer">
                            <img src={liLogo} className='link-icons' alt='LinkedIn'></img>
                        </a>
                    </li>
                    <li>
                        <a href='/resume.pdf' download='Simion-Cartis-Resume.pdf'>
                            <img src={downloadIcon} className='link-icons' alt='Download Resume'></img>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;