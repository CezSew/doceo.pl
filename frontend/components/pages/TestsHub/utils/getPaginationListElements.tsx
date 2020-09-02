import React, {useState} from "react";

let _currPage;
let _setCurrPage;
let _getQuizes;

const getPaginationListElements = (currPage, totalPages, setCurrPage, getQuizes) => {
    let reachedDots = false;
    let elements = [];

    _setCurrPage = setCurrPage;
    _getQuizes = getQuizes;
    _currPage = currPage;

    if(currPage > 1) pushElement('-3', '<', elements);

    for(let i = -1; i < totalPages; i++) {
        if(currPage + i > 0 && currPage + i <= totalPages) {
            let current = currPage + i;

            if(!reachedDots) {
                if(current > currPage + 2) {
                    pushElement(i, '...', elements);
                    reachedDots = true;
                } else {
                    pushElement(i, current, elements);
                }
            } else {
                pushElement(i, totalPages, elements);
                break;
            }
        }
    }

    if(currPage < totalPages) pushElement(totalPages + 1, '>', elements);

    return elements;
}

const pushElement = (id, content, array) => {
    const element = (
        <li key={id}>
            <button onClick={() => handlePaginationClick(content)}>
                {content}
            </button>
        </li>
    );

    array.push(element);
}

const handlePaginationClick = (content) => {
    switch(content) {
        case '<':
        _setCurrPage(_currPage - 1);
        _getQuizes(_currPage - 1);
        break;
    case '>':
        _setCurrPage(_currPage + 1);
        _getQuizes(_currPage + 1);
        break;
    default:
        _setCurrPage(content);
        _getQuizes(content);
        break;
    }


}

export default getPaginationListElements;
