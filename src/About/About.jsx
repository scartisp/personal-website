import './about.css'
import coding from '../assets/code.jpg'

const About = () => {
    return (
        <div id='about' className='about'>
            <h2 className='about-title'>ABOUT</h2>
            <div className='about-content'>
                <div className='about-text'>
                    <p>With an insatiable appetite for learning, I thrive where innovation blooms. Always looking for the next hill to climb, I am constantly learning and refining skills. Be it android development, web design, machine learning, or new guitar chops, you will always find me with my nose to the grind stone.</p>
                    <p>Outside of programming, I enjoy playing playing and listening to music, going to the gym, and reading. My current favorite band is Opeth and my current read is Frankenstein</p>
                </div>
                    <img src={coding} className='code-img'></img>
            </div>
        </div>
    );
}

export default About;