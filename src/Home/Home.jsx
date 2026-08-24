// Written by: Simion Cartis

import './home.css'

const Home = () => {
    return (
        <div id='home' className='home'>
            <div className="home-inner">
                <div className="name-div">
                    <h1 className="home-name">
                        Simion <span className='last-name'>Cartis</span>
                    </h1>
                </div>
                <div className='sub-name-content'>
                    <h2 className='adjectives'>Student, Developer, Innovator</h2>
                    <p className='blurb'>Translating my Industry and academic experience into reliable software solutions. Senior at the University of South Carolina </p>
                </div>
            </div>
        </div>
    );
}

export default Home;