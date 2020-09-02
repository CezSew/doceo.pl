import React from "react";
import getPaginationListElements from "../utils/getPaginationListElements";

const Pagination = ({currPage, totalPages, setCurrPage, getQuizes}) => {
    const elements = getPaginationListElements(currPage, totalPages);

    return (
        <ul className="c-pagination">
            {elements}
            {/*<li key="p1" onClick={(e) => getQuizes()}>*/}

            {/*</li>*/}
        </ul>
    )
}

export default Pagination;
