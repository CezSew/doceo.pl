import '../../css/pages/userPanel.scss';
import React from "react";
import Header from "../parts/Header";
import { connect } from 'react-redux';

const UserPanel = (props) => {
    return (
        <div className="c-user-panel">
            Hello, {props.user.name}
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, null)(UserPanel)
