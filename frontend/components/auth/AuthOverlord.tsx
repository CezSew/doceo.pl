import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getJwt } from '../../helpers';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

interface AuthOverlordProps {
    setUser: Function,
    user: any,
    isUserLoggedIn: boolean|null
}

class AuthOverlord extends Component<AuthOverlordProps> {

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    const jwt = getJwt();

    if (!jwt) {
      this.props.setUser(undefined);
      return;
    }

    if (!this.props.isUserLoggedIn) {
      axios.get('http://localhost:8000/api/user', { headers: { Authorization: getJwt() } }).then(res => {
          const user = res.data.user;
          this.props.setUser(user);
      });
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isUserLoggedIn: state.isUserLoggedIn
})

const mapDispatchToProps = dispatch => {
  return {
      setUser: (user) => dispatch({ type: 'SET_USER', payload: {user} }),
  }
}

export default compose<any>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AuthOverlord);
