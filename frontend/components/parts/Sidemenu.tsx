import React from "react";
import {Link} from 'react-router-dom';

const Sidemenu = ({links}) => {
    const listElements = links.map((item, key) => {
        return (
            <li className="o-sidemenu__list-element" key={key}>
                <Link to={item[0]} className="o-sidemenu__link">{item[1]}</Link>
            </li>
        )
    });

    return (
        <aside className={`o-sidemenu ${window.innerWidth < 1780 && 'o-sidemenu--hidden'}`}>
            <ul className="o-sidemenu__list">
                {listElements}
            </ul>
        </aside>
    )
}

export default Sidemenu;
