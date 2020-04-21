
import * as React from 'react';
import {BrowserRouter , Switch, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import AuthGuard from './components/pages/AuthGuard';
import Protected from './components/pages/Protected';
import TestsHub from './components/pages/TestsHub/TestsHub';
import QuizCreator from './components/pages/QuizCreator/QuizCreator';
import SingleTest from './components/pages/SingleTest/SingleTest';
import ErrorBoundary from './components/utils/ErrorBoundary';

export const RouterComponent = () => (
    <BrowserRouter>
        <ErrorBoundary>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/tests-main" component={TestsHub} />
            <Route path="/test-page" component={SingleTest} />
            <AuthGuard>
              <Route path={'/protected'} component={Protected} />
              <Route path={'/create-quiz'} component={QuizCreator} />
            </AuthGuard>
          </Switch>
        </ErrorBoundary>
    </BrowserRouter>
);
