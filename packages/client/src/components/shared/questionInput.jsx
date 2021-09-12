import React from 'react'

const Question = React.forwardRef((props, ref) => {
    return(
            <div className="question_input d-flex align-items-flex-start">
                <span>{props.question}</span>
                <select className="form-control" defaultValue={props.value} ref={ref}>
                    <option></option>
                    <option value="true">OUI</option>
                    <option value="false">NON</option>
                </select>
            </div>
    );
})
export default Question;