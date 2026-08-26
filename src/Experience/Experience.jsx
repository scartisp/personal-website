import './experience.css'

const Experience = () => {
    const workExperience = [
        {
            title: 'Android Development Intern',
            company: 'Textron, E-Z-GO',
            duration: 'June 2026-August 2026',
            location: 'Augusta, GA',
            work: ['Built Android logic and UI for a new golf-distance-adjustment feature, combining hole elevation data with live GPS altitude to calculate elevation-adjusted yardage for all TruPin-equipped courses.', 'Queried the site-wide course database via LINQ, retrieving per-hole pin altitude for TruPin-enabled courses and sending it to tablets on startup.', 'Built a UDP-based service that relays hourly Perry Weather API wind speed/direction data to tablets on request.', 'Wrote a client-side pathway polling the server every 5 minutes to render live beverage-cart locations on the tablet map view.'],
            tools: 'Java, Kotlin, C#/.NET, Azure DevOps'

        }
    ];
    return (
        <div id='experience' className='section-div'>
            <h2 className='section-titles'>Experience</h2>
            <h3 className='section-subtitles'>Work Experience</h3>
            <div className='work-experience-div'>
                {workExperience.map((job, index) => (
                    <div key={index} className='experience-card'>
                        <div className='meta-div'>
                        <div className='meta-block'> 
                            <h5 className='meta-label'>Duration</h5>
                            <span className='meta-text'>{job.duration}</span>
                        </div>
                        <div className='meta-block'> 
                            <h5 className='meta-label'>Location</h5>
                            <span className='meta-text'>{job.location}</span>
                        </div>
                        </div>
                        <div className='details-div'> 
                            <h4 className='experience-title'>{job.title}</h4>
                            <h5 className='experience-company'>{job.company}</h5>
                            <ul className='work-description'>
                                {job.work.map((bullet,index) => (
                                    <li key={index}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experience;