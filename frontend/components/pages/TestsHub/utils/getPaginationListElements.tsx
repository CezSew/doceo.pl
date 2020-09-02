import React, {useState} from "react";

const getPaginationListElements = (currPage, totalPages) => {
    let reachedDots = false;
    let elements = [];

    for(let i = -2; i < totalPages; i++) {
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

    return elements;
}

const pushElement = (id, content, array) => {
    const element = (
        <li key={id}>
            <button>
                {content}
            </button>
        </li>
    );

    array.push(element);
}

export default getPaginationListElements;
