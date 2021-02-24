import React from 'react';

import { Icon } from 'semantic-ui-react';

import Layout from '@/domain/Layout';

class Page404 extends React.Component {
	render() {
		return (
			<Layout>
				<div className="not-found">
					<Icon name="minus circle" size="big" />
					<strong>Page not found!</strong>
				</div>
			</Layout>
		);
	}
}

export default Page404;
