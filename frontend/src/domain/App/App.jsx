import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import importedComponent from 'react-imported-component';

import Loading from '@/components/Loading';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';

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
						<Route component={AsyncNoMatch} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
