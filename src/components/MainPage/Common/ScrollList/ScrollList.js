import React from 'react';
import Loading from '../../Common/Loading/Loading'
import ErrorList from '../../Common/ErrorList/ErrorList'

export default function ScrollList({ list, updatePageNumber, elementView }) {
    window.onscroll = () => { 
        const element = document.documentElement;
        if(element != null) {
            if( element.scrollTop + element.clientHeight > element.scrollHeight - (0.2 * element.clientHeight)) {
                if(!list.isLoading 
                    && !list.errors
                    && !list.isAll) {
                    updatePageNumber() 
                }
            }
        }    
    }
    
    return (
        <div className="scrollList">
            <ul> 
                {Array.isArray(list.elements) 
                    && list.elements.map((element) => 
                    <li key={element.id.toString()}>
                        {elementView(element)}
                    </li>)
                }
            </ul>
            <Loading loading={list.isLoading}/>
            <ErrorList errorList={list.errors}/>    
        </div>
    )
}