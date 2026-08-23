import './header.css'
import githubLogo from '../assets/github-logo.png'
import liLogo from '../assets/li-logo.png'
import downloadIcon from '../assets/download-icon.png'

// TODO: logo needs to send to top
const Header = () => {
    return (
        <header>
            <nav className='site-header'>
                <a href='/' className="logo a-link">Simion Cartis</a>
                <ul className='header-list-element header-nav'>
                    <li>Skills</li>
                    <li>Experience</li>
                    <li>Portfolio</li>
                    <li>Contact</li>
                </ul>
                <ul className='header-list-element header-link-icons'>
                    <li>
                        <img src={githubLogo} className='link-icons' alt='GitHub'></img>
                    </li>
                    <li>
                        <img src={liLogo} className='link-icons' alt='LinkedIn'></img>
                    </li>
                    <li>
                        <img src={downloadIcon} className='link-icons' alt='Download Resume'></img>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;