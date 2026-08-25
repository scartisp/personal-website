
import './skills.css'

const Skills = () => {
    const skills = [
        'Java',
        'C#/.Net',
        'Kotlin',
        'JavaScript',
        'Python',
        'C++',
        'MySQL',
        'HTML/CSS',
        'React',
        'Node.js',
        'Git/Github',
        'Linux/Bash',
        'Claude Code',
        'Agile development',
        'Android development',
        'OOP',
        'Unit testing'
    ];
    return (
        <div id='skills' className='section-div'>
            <h2 className='section-titles'>SKILLS</h2>
            <div className='skills-pill-div'>
                {skills.map((skill, index) => (
                    <div key={index} className='skill-pill'>
                        {skill}    
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Skills;