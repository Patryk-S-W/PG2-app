import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import importedComponent from 'react-imported-component';

import HomePage from '@/pages/HomePage';
import Loading from '@/components/Loading';

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
						<Route component={AsyncNoMatch} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
