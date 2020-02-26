
import * as React from 'react';
import {BrowserRouter , Switch, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import AuthGuard from './components/pages/AuthGuard';
import Protected from './components/pages/Protected';
import TestsHub from './components/pages/TestsHub';

export const RouterComponent = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/tests-main" component={TestsHub} />
        <AuthGuard>
          <Route path={'/protected'} component={Protected} />
        </AuthGuard>
      </Switch>
    </BrowserRouter>
);
