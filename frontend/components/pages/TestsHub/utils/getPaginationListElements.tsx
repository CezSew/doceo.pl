import '../../../../css/parts/pagination.scss';
import React from "react";

let _currPage;
let _setCurrPage;
let _getQuizes;

const getPaginationListElements = (currPage, totalPages, setCurrPage, getQuizes) => {
    let reachedDots = false;
    let elements = [];

    _setCurrPage = setCurrPage;
    _getQuizes = getQuizes;
    _currPage = currPage;

    if(currPage > 1) pushElement('-3', '<', elements, 'c-pagination__element--arrow');

    for(let i = -1; i < totalPages; i++) {
        if(currPage + i > 0 && currPage + i <= totalPages) {
            let current = currPage + i;

            if(!reachedDots) {
                if(current > currPage + 2) {
                    pushElement(i, '...', elements, 'c-pagination__element--dots');
                    reachedDots = true;
                } else {
                    let classes = '';
                    if(_currPage === current)  classes = 'c-pagination__element--current';
                    pushElement(i, current, elements, classes);
                }
            } else {
                pushElement(i, totalPages, elements);
                break;
            }
        }
    }

    if(currPage < totalPages)
        pushElement(totalPages + 1, '>', elements, 'c-pagination__element--arrow');

    return elements;
}

const pushElement = (id, content, array, classes = '') => {
    const element = (
        <li key={id} className="c-pagination__list-element">
            <button className={`c-pagination__element ${classes}`} onClick={() => handlePaginationClick(content)}>
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
