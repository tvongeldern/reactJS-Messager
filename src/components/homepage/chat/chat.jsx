import React from 'react';
class Chat extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            convoName: this.props.convo,
            you: window.NAMESPACE.you,
            model: '',
            messages: []
        };
        this.setConvo = this.setConvo.bind(this);
        this.modelMessage = this.modelMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    setConvo (convo) {
        this.setState({ convoName: convo.name, messages: convo.messages });
    }

    modelMessage (e) {
        var message = e.target.value;
        this.setState({model: message});
    }

    sendMessage (e) {
        var msg = this.state.model;
        var input = document.getElementsByTagName('textarea')[0] || {};
        var arr;
        window.socket.emit("new-message", {
            from: window.NAMESPACE.me,
            to: window.NAMESPACE.you,
            convo: window.NAMESPACE.convo,
            message: msg
        });
        arr = this.state.messages;
        arr.push(msg);
        input.value = '';
        this.setState({model: '', messages: arr});
    }

    render () {
        return (
            <div className="chat-container">
                <div className="chat-modal">
                    <h3 className="chat-title">{window.NAMESPACE.you}</h3>
                    <ul>
                        {
                            this.state.messages.map(msg => {
                                var sender = msg.from == window.NAMESPACE.me ? 'outgoing' : 'incoming';
                                var key = this.state.messages.indexOf(msg);
                                return (
                                    <li className={sender} key={key}>{msg.message}</li>
                                )
                            })
                        }
                    </ul>
                    <textarea rows="4" maxLength="100" onKeyUp={this.modelMessage}></textarea>
                </div>
                <button onClick={this.sendMessage}>Send</button>
            </div>
        );
    }

    componentDidMount () {
        window.socket.on('conversation-data', data => {
            if (data.name == window.NAMESPACE.convo) {
                this.setConvo(data);
            }
        });
    }

};

export default Chat;
