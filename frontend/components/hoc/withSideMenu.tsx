import React from "react";
import Header from "../parts/Header";
import { Link } from 'react-router-dom';

export const WithSideMenu = (Component, {title = null, sideLinks = null}) => props => {
    const options = sideLinks && sideLinks.map(option => {
        return (
            <li key={Math.floor(Math.random() * 1000000) + 1} className="o-page__menu-item">
                <Link to={option.link} className="o-page__menu-link">{option.text}</Link>
            </li>
        )
    });

    return (
        <React.Fragment>
            <Header/>
            <main className="o-page">
                <div className="o-container o-container--with-sidemenu">
                    <div className="o-page__title-container">
                        <h1 className="o-title o-title--h2 o-title--line o-page__title">
                            {title}
                        </h1>
                    </div>
                    <aside className="o-page__menu">
                        {options}
                    </aside>
                    <main className="o-page__main">
                        <Component {...props}/>
                    </main>
                </div>
            </main>
        </React.Fragment>
    );
}
