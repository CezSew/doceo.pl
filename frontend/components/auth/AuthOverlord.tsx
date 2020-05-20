import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useGetUser } from '../../hooks/getUser';
import axios from "axios";
import { getJwt } from '../../helpers';

interface AuthOverlordProps {
    setUser: Function,
    user: any,
    isUserLoggedIn: boolean|null,
    host: string,
    children: any
}

/**
 * Load user from server each time app is reloaded
 */

const AuthOverlord = (props: AuthOverlordProps) => {
    useEffect(() => {
        const jwt = getJwt();

        if (!jwt) {
            this.props.setUser(undefined);
            return;
        }

        if (!props.isUserLoggedIn) {
            axios.get(`${props.host}/api/user`, {headers: {Authorization: jwt}}).then(res => {
                props.setUser(res.data.user);
            })
            .catch(error => {
                console.log(error);
            });
        }
    })


    return props.children;
}

const mapStateToProps = state => ({
    user: state.user,
    isUserLoggedIn: state.isUserLoggedIn,
    host: state.host
})

const mapDispatchToProps = dispatch => {
  return {
      setUser: (user) => dispatch({ type: 'SET_USER', payload: {user} }),
  }
}

export default
    compose<any>(
      withRouter,
      connect(mapStateToProps, mapDispatchToProps)
    )(AuthOverlord)
