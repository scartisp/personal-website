
import './projects.css'
import harmoniaLogo from '../assets/harmoniaLogo.png'
import amazon from '../assets/amazon.png'
import voter from '../assets/voter.png'

const Projects = () => {
    const projects = [
        {
            title: 'Harmonia Music',
            tools: 'Java, JSON, JavaFX, JUnit, XML, GitHub',
            description: 'Music writting app where users can create and share songs.',
            image: harmoniaLogo,
            sourceCode: 'https://github.com/JIMorris/harmonia-music?tab=readme-ov-file',
            demo: 'https://www.youtube.com/watch?v=FEhAVRWip8Y'
        },
        {
            title: 'Amazon Website',
            duration: 'January 2026-April 2026',
            tools: 'JavaScript, Jest, Git, HTML5, CSS3',
            description: 'Replicate of the Amazon webpage. You are able to search for items, add them to a cart, decide delivery date, and order them',
            image: amazon,
            sourceCode: 'https://github.com/scartisp/javascript-amazon-project',
            demo: 'https://github.com/scartisp/javascript-amazon-project'
        },
        {
            title: 'Voter Turnout Visualization',
            duration: 'April 2026',
            tools: 'Python, Pandas, Plotly',
            description: 'Interactive analysis of U.S. voter turnout, 1978–2024, built from three U.S. Census Bureau datasets.',
            image: voter,
            sourceCode: 'https://github.com/scartisp/visualization-project',
            demo: 'https://scartisp.github.io/visualization-project/'
        }
    ]
    return (
        <div id='projects' className='section-div'>
            <h2 className='section-titles'>Projects</h2>
            <div id='projects-div'>
                {projects.map((project, index) => (
                    <div key={index} className='project-card'>
                        <a href={project.demo} target="_blank" rel="noreferrer"><img src={project.image} className='image-demo-link'></img></a>
                        <div className='project-info'> 
                            <h5 className='project-tools'>{project.tools}</h5>
                            <h4 className='project-title'>{project.title}</h4>
                            <p className='project-description'>{project.description}</p>
                            <a href={project.sourceCode} target="_blank" rel="noreferrer" className='project-source-code'>Source Code</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Projects;