import React from "react"
import UserView from '../../../Common/UserView/UserView'
import dateFormatter from '../../../../../logicElements/dateFormatter'
import SystemMessage from "./SystemMessage";
import './Message.css'
import './MessagePreview.css'

export default function MessagePreview({ message }) {
	if(message) {
		if(!message.sender || !message.sender.username)
			return <SystemMessage message={message} />
		let className = "";
		if(!message.isRead) 
			className = "notRead";
    	return (
			<div className='messagePreview'>
				<UserView userView={message.sender}/>
            	<div className="messagePreviewData" id={`${className}`}>
                	<time>{dateFormatter(message.date)}</time>
					<div className="box-text">
						{message.body}
					</div>
                </div>
			</div>
		)
	}
	return null;
}

