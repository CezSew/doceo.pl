import React from "react";
import '../../css/parts/loader.scss';

const Loader: React.FC = () => {
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

export default Loader;
