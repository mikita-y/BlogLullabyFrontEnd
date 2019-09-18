import React from "react"
import UserView from '../../UserView/UserView'
import dateFormatter from '../../../../../logicElements/dateFormatter'
import './Message.css'
import './MessagePreview.css'



function MessagePreview({ message }) {
	if(message)
    	return (
			<div className='messagePreview'>
				<UserView userView={message.owner}/>
            	<div className='messagePreviewData'>
                	<time>{dateFormatter(message.date)}</time>
					<div className="box-text">
						{message.body}
					</div>
                </div>
			</div>
		)
	return null;
}

export default MessagePreview;