import React from 'react';
import Hero from './hero/hero.jsx';
import Header from './header/header.jsx';
import UserForm from './userform/userform.jsx';
import AvailableUsers from './availableusers/availableusers.jsx';
import Chat from './chat/chat.jsx'

class Homepage extends React.Component {
    render () {
        return (
            <div>
                <Header/>
                <Hero/>
                <UserForm/>
                <AvailableUsers/>
                <Chat convo={window.NAMESPACE.convo}/>
            </div>
        );
    }
};

export default Homepage;
