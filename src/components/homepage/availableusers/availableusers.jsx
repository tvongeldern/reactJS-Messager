import React from 'react';

class AvailableUsers extends React.Component {

    constructor () {
        super();
        this.state = {
            availableUsers: []
        };
    }

    selectUser (e) {
        var convoName,
            arr = [],
            elem = e.target,
            user = elem.innerHTML,
            ns = window.NAMESPACE;

        ns.you = user;

        if (ns.you && ns.me && ns.you != ns.me){
            arr.push(ns.me, ns.you);
            arr.sort();
            convoName = '-' + arr.join('-') + '-';
            ns.convo = convoName;
            window.socket.emit('conversation-data', convoName);
        }
    }

    render () {
        return (
            <div className="available-users-container">
                <ul>
                    <li className="list-title">Online Users</li>
                    {
                        this.state.availableUsers.map(user => {
                            if (user != window.NAMESPACE.me){
                                return (
                                    <li key={user} className="online-user" onClick={this.selectUser}>{user}</li>
                                )
                            }
                        })
                    }
                </ul>
            </div>
        );
    }

    componentWillMount () {
        window.socket.on('all-available-users', arr => {
            this.setState({availableUsers: arr});
        });
    }

};

export default AvailableUsers;
