import React from 'react';

class UserForm extends React.Component {

    constructor () {
        super();
        this.state = {
            headerText: 'What is your name?',
            signedOn: false
        }
        this.userConnect = this.userConnect.bind(this);
        this.userKeyPress = this.userKeyPress.bind(this);
    }

    userConnect (e) {
        var elem = e.target;
        var userName = elem.value;
        var socket = window.socket;
        if (userName && !this.state.signedOn) {
            socket.emit('user-enter', userName);
            socket.on('sign-on-confirmation', user => {
                if (user == userName){
                    elem.disabled = true;
                    this.setState({
                        headerText: "Welcome!",
                        signedOn: true
                    });
                    window.NAMESPACE.me = userName;
                }
            });
            socket.on('sign-on-name-error', user => {
                if (user == userName){
                    this.setState({headerText: "Somebody by the name of " + userName + " is already logged on, please try another name"});
                    elem.focus();
                }
            });
        }
    }

    userKeyPress (e) {
        if (e.keyCode == 13){
            this.userConnect(e);
        }
    }

    render () {
        var markup = "Hello";
        return (
            <div className="userform-container">
                <div className="user-form">
                    <div className="user-name">
                        <label htmlFor="user">{this.state.headerText}<br/></label>
                        <input type="text" name="user" onBlur={this.userConnect} onKeyDown={this.userKeyPress}/>
                    </div>
                </div>
            </div>
        );
    }

};

export default UserForm;
