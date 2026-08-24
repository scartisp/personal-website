// Written by: Simion Cartis

import './home.css'

const Home = () => {
    return (
        <div className="home">
            <div className="name-div">
                <h2 className="home-name">
                    Simion <span className='last-name'>Cartis</span>
                </h2>
            </div>
            <div className='sub-name-content'>
                <h3 className='adjectives'>Student, Developer, Innovator</h3>
                <h3>Translating my Industry and academic experience into reliable software solutions. Senior at the University of South Carolina </h3>
            </div>
        </div>
    );
}

export default Home;