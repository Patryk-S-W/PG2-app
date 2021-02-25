import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

import LogoInfo from '@/components/LogoInfo';

class LoginPage extends React.Component {
	render() {
		return (
			<Grid stackable equal padded>
				<Grid.Column width={8} color="blue">
					<Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
						<Grid.Column>
							<LogoInfo />
						</Grid.Column>
					</Grid>
				</Grid.Column>
				<Grid.Column width={8}>
					<Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
						<Grid.Column style={{ maxWidth: 450 }}>
							<Header as="h1" color="blue" textAlign="center">
								Zaloguj się do konta
							</Header>
							<Form size="large">
								<Segment piled>
									<Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail" />
									<Form.Input
										fluid
										icon="lock"
										iconPosition="left"
										placeholder="Hasło"
										type="password"
									/>

									<Button color="blue" fluid size="large">
										Zaloguj
									</Button>
								</Segment>
							</Form>
							<Message floating>
								Nie masz konta? <a href="/register">Zarejestruj się</a>
							</Message>
						</Grid.Column>
					</Grid>
				</Grid.Column>
			</Grid>
		);
	}
}

export default LoginPage;
