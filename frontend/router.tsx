
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
import UserPanel from "./components/pages/UserPanel";
import {WithSideMenu} from "./components/hoc/withSideMenu";

export const RouterComponent = () => (
    <BrowserRouter>
        <ErrorBoundary>
            <Switch>
                <Route exact path="/"               component={Home} />
                <Route exact path="/login"          component={Login} />
                <Route exact path="/tests-main"     component={TestsHub} />
                <Route exact path="/test-page"      component={SingleTest} />
                <Route exact path='/protected'      component={WithAuthGuard(Protected)} />
                <Route exact path='/create-quiz'    component={WithAuthGuard(QuizCreator)} />
                <Route exact path="/user-panel"     component={WithAuthGuard(WithSideMenu(UserPanel, {title: 'Panel użytkownika', sideLinks: [{text: 'Strona główna', link: '/'}, {text: 'Wyświetl testy', link: '/tests-main'}]}))} />
                <Route                              component={PageNotFound} />
            </Switch>
        </ErrorBoundary>
    </BrowserRouter>
);

const options = {
    title: 'Kreator testów',
    sideLinks: [
        {
            text: 'Strona główna',
            link: '/'
        },
        {
            text: 'Wyświetl testy',
            link: '/tests-main'
        }
    ]
}
