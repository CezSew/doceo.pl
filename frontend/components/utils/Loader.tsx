import React from "react";
import '../../css/parts/loader.scss';

export const Loader: React.FC = () => {
    return (
        <div className="o-loader-container">
            <div className="o-loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}