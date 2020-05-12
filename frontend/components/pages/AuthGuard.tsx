import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getJwt } from '../../helpers';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import store from "../../store";
import Header from '../parts/Header';

interface AuthGuardProps {
    history: any,
    setUser: Function,
    user: any,
    isUserLoggedIn: boolean|null,
    host: string
}

class AuthGuard extends Component<AuthGuardProps> {

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    const jwt = getJwt();
    if (!jwt) {
      this.props.setUser(null);
      return;
    }

    axios.get(`${this.props.host}/api/user`, { headers: { Authorization: getJwt() } }).then(res => {
      this.props.setUser(res.data.user);

      if(!res.data.user) {
        this.props.history.push('/login');
      }
    });
  }

  render() {
    if(!this.props.isUserLoggedIn) {
      return (
      <React.Fragment>
        <Header/>
        <div className="o-container">
          <p>Loading ...</p>
        </div>
      </React.Fragment>
      );
    } else {
      return this.props.children;
    }
  }
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

export default compose<any>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AuthGuard);
