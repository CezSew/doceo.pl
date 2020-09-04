import React from "react";
import getPaginationListElements from "../utils/getPaginationListElements";

const Pagination = ({currPage, totalPages, setCurrPage, getQuizes}) => {
    const elements = getPaginationListElements(currPage, totalPages, setCurrPage, getQuizes);

    return (
        <div className="c-pagination">
            <ul className="c-pagination__list">
                {elements}
            </ul>
        </div>
    )
}

export default Pagination;
