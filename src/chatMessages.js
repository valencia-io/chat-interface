import React, {Component} from 'react';
import ChatMessage from './chatMessage';
import {connect} from 'react-redux';
import {stateToProps, dispatchToProps, startAutoScrollAction, stopAutoScrollAction} from './redux';

class ChatMessagesComp extends Component {
    constructor(props) {
        super();
        window.addEventListener("resize", () => {
            if (!this.props.state.isAutoScrolling) {
                this.props.dispatch(startAutoScrollAction(this.chatMessagesElement));
                setTimeout(() => {
                    this.props.dispatch(stopAutoScrollAction());
                },1000)
            }
        });
    }
    onUpdateText() {
        if (!this.props.state.isAutoScrolling) {
            this.props.dispatch(startAutoScrollAction(this.chatMessagesElement));
        }
    }
    onTypingDone() {
        if (this.props.state.isAutoScrolling) {
            this.props.dispatch(stopAutoScrollAction());
        }
    }
    render() {
        const lastMessange = this.props.state.messagesHistory.length - 1;
        const history = this.props.state.messagesHistory.map((el, i) => <ChatMessage animate={i === lastMessange} key={i} onTypingDone={this.onTypingDone.bind(this)} onUpdateText={this.onUpdateText.bind(this)} content={el.content} me={el.user === 'me'}/>);
        return (
            <div className="chat-messages" ref={(input) => {
                this.chatMessagesElement = input
            }}>
                <div className="chat-messages-wraper">
                    {history}
                    {history}
                </div>
            </div>
        );
    }
}
export default connect(stateToProps, (dispatchToProps))(ChatMessagesComp)
