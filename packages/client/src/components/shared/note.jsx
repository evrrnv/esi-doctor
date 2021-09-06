import React from 'react'
import '../../assets/css/notes.css'
const NoteElm = (props) =>{
    return(
        <div className="notes_text d-flex align-items-flex-start">
            <span>{props.text}</span>
        </div>
    );
}
export default NoteElm