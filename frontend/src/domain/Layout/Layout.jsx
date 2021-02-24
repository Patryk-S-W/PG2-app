import React from 'react';

import { Container, Divider } from 'semantic-ui-react';

import Header from '@/domain/Header';

import { pullRight } from './Layout.css';

class Layout extends React.Component {
	render() {
		let children = this.props.children;
		return (
			<Container>
				<Header />
				{children}
				<Divider />
				<p className={pullRight}>PG2 App</p>
			</Container>
		);
	}
}

export default Layout;
