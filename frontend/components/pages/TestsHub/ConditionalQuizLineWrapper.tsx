import React from "react";
import { Link } from 'react-router-dom';

const ConditionalQuizLineWrapper = (props) => {
    let renderElement;

    if(!props.userPanel) {
        renderElement = (
            <Link to={props.link} className="c-test-hub__quiz-link"
            >
                {props.children}
            </Link>
        )
    } else {
        renderElement = (
            <div className="c-test-hub__quiz-link">
                {props.children}
            </div>
        )
    }

    return renderElement;
}

export default ConditionalQuizLineWrapper;
