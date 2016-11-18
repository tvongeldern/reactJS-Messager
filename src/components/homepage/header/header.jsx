import React from 'react';

class Header extends React.Component {
    render () {
        return (
            <div className="header-container">
                <a href='https://github.com/tvongeldern/'>
                    <img src="./media/github.png" target="_blank" className="gitHub"/>
                    <b>https://github.com/tvongeldern/</b>
                </a>
            </div>
        );
    }
};

export default Header;
