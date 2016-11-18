import React from 'react';
import Hero from './hero/hero.jsx';
import Header from './header/header.jsx';

class Homepage extends React.Component {
    render () {
        return (
            <div>
                <Header/>
                <Hero/>
            </div>
        );
    }
};

export default Homepage;
