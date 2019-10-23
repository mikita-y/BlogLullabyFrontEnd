import React from "react"
import UserView from '../../../Common/UserView/UserView'
import dateFormatter from '../../../../../logicElements/dateFormatter'
import './Message.css'
import SystemMessage from "./SystemMessage";

function Message({ message, isAccountMessage }) {
	if(message) {
		let readStatus = "";
		if(!message.isRead ) {
			readStatus = "notRead";
		}
		if(!message.sender || !message.sender.username)
			return <SystemMessage message={message} />
    	return (
			<div className='message'>
				<div className={isAccountMessage ? 'dialogMessageRevers' : 'dialogMessage' }>
					<UserView 
						userView={ message.sender }
						showName={!isAccountMessage}
					/>
					<time>
						{dateFormatter(message.date)}
					</time>
					<p id={`${readStatus}`}>
						{message.body}
					</p>
				</div>
			</div>
		)
	}	
	return null;
}

export default Message;