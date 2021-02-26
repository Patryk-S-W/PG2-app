import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import importedComponent from 'react-imported-component';

import Loading from '@/components/Loading';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import AdminPage from '@/pages/AdminPage';

import AllUsersPage from '@/pages/AllUsersPage';
import StudentsPage from '@/pages/StudentsPage';
import CuratorsPage from '@/pages/CuratorsPage';
import LeadersPage from '@/pages/LeadersPage';
import ClientsPage from '@/pages/ClientsPage';
import SendRaportPage from '@/pages/SendRaportPage';
import MyProjectsPage from '@/pages/MyProjectsPage';
import AllProjectsPage from '@/pages/AllProjectsPage';
import UsersPage from '@/pages/UsersPage';

import { history } from '@/helpers';

const AsyncNoMatch = importedComponent(() => import(/* webpackChunk Name:'NoMatch' */ '@/pages/Page404'), {
	LoadingComponent: Loading
});

class App extends React.Component {
	render() {
		return (
			<Router history={history}>
				<div>
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route exact path="/login" component={LoginPage} />
						<Route exact path="/register" component={RegisterPage} />
						<Route exact path="/admin" component={AdminPage} />
						<Route exact path="/allusers" component={AllUsersPage} />
						<Route exact path="/studenci" component={StudentsPage} />
						<Route exact path="/opiekunowie" component={CuratorsPage} />
						<Route exact path="/leaders" component={LeadersPage} />
						<Route exact path="/clients" component={ClientsPage} />
						<Route exact path="/sendreport" component={SendRaportPage} />
						<Route exact path="/myprojects" component={MyProjectsPage} />
						<Route exact path="/allprojects" component={AllProjectsPage} />
						<Route exact path="/users" component={UsersPage} />
						<Route component={AsyncNoMatch} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
