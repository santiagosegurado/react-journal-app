import React from 'react';
import moment from 'moment'
import { activeNote } from '../../actions/notes';
import { useDispatch } from 'react-redux';

export const JournalEntry = ({ id, title, body, date, url, setActiveMenu, activeMenu }) => {
    
    const noteDate = moment(date);

    const dispatch = useDispatch();

    const thisEntry = {
        title,
        body,
        date,
        url
    }

    const handleEntryClick = () => {
        
        setActiveMenu(!activeMenu)
        dispatch( activeNote(id, thisEntry) )
    }

    
    return (
        <div 
            className="journal__entry" 
            onClick={ handleEntryClick }
        >
            
            {
                url &&
                    (<div 
                        className="journal__entry-picture"
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url(${ url })`
                        }}
                    >
                    </div>)
            }
            
            <div className="journal__entry-body" >
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content" >
                    {body}
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>{ noteDate.format('dddd') }</span>
                <h4>{ noteDate.format('Do') }</h4>
            </div>
        </div>
    )
}
