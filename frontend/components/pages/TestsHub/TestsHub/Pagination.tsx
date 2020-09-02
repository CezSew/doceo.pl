import React from "react";
import getPaginationListElements from "../utils/getPaginationListElements";

const Pagination = ({currPage, totalPages, setCurrPage, getQuizes}) => {
    const elements = getPaginationListElements(currPage, totalPages, setCurrPage, getQuizes);

    return (
        <ul className="c-pagination">
            {elements}
        </ul>
    )
}

export default Pagination;
