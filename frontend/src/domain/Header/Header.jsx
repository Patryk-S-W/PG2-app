import React from 'react';

import { Header as Head } from 'semantic-ui-react';

import { h1 } from './Header.css';

class Header extends React.Component {
	render() {
		return (
			<div className="header">
				<Head as="h1" className={h1}>
					Header
				</Head>
			</div>
		);
	}
}

export default Header;
