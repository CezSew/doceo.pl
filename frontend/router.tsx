
import * as React from 'react';
import {BrowserRouter , Switch, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login/Login';
import Protected from './components/pages/Protected';
import TestsHub from './components/pages/TestsHub/TestsHub/TestsHub';
import QuizCreator from './components/pages/QuizCreator/QuizCreator';
import SingleTest from './components/pages/SingleTest/SingleTest';
import ErrorBoundary from './components/utils/ErrorBoundary';
import PageNotFound from "./components/pages/PageNotFound";
import { WithAuthGuard } from "./components/hoc/withAuthGuard";
import UserPanel from "./components/pages/userPanel/UserPanel";
import UserTests from "./components/pages/userPanel/UserTests";

export const RouterComponent = () => (
    <BrowserRouter>
        <ErrorBoundary>
            <Switch>
                <Route exact path='/'               component={Home} />
                <Route exact path='/login'          component={Login} />
                <Route exact path='/tests-main'     component={TestsHub} />
                <Route exact path='/test-page'      component={SingleTest} />
                <Route exact path='/protected'      component={WithAuthGuard(Protected)} />
                <Route exact path='/create-quiz'    component={WithAuthGuard(QuizCreator)} />
                <Route exact path='/user-panel'     component={WithAuthGuard(UserPanel)} />
                <Route exact path='/user-tests'     component={WithAuthGuard(UserTests)}/>
                <Route                              component={PageNotFound} />
            </Switch>
        </ErrorBoundary>
    </BrowserRouter>
);
