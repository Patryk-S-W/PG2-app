import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

import { logowrapper, logo, logoSmall, logoSmaller } from './RegisterPage.css';

class RegisterPage extends React.Component {
	render() {
		return (
			<Grid stackable equal padded>
				<Grid.Column width={8} color="blue">
					<Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
						<Grid.Column>
							<div className={logowrapper}>
								<span className={logo} title="Projekty Grupowe Politechniki Gdańskiej">
									PG²
								</span>
								<span className={logoSmall} title="Projekty Grupowe Politechniki Gdańskiej">
									Projekty Grupowe Politechniki Gdańskiej
								</span>
								<div className={logoSmaller}>
									Projekty Grupowe Politechniki Gdańskiej to system umożliwiający zarządzanie
									projektami grupowymi na wydziale Fizyki Technicznej i Matematyki Stosowanej.
								</div>
								<div className={logoSmaller}>
									Pozwala opiekunom, kierownikom projektów, studentom, a także firmom na łatwe
									zarządzanie projektami i generowanie raportów.
								</div>
							</div>
						</Grid.Column>
					</Grid>
				</Grid.Column>
				<Grid.Column width={8}>
					<Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
						<Grid.Column style={{ maxWidth: 450 }}>
							<Header as="h1" color="blue" textAlign="center">
								Rejestracja
							</Header>
							<Form size="large">
								<Segment piled>
									<Form.Group widths="equal">
										<Form.Input fluid icon="user" iconPosition="left" placeholder="Imię" />
										<Form.Input fluid icon="user" iconPosition="left" placeholder="Nazwisko" />
									</Form.Group>
									<Form.Input fluid icon="building" iconPosition="left" placeholder="Nazwa firmy" />
									<Form.Input fluid icon="mail" iconPosition="left" placeholder="E-mail" />
									<Form.Input
										fluid
										icon="user circle "
										iconPosition="left"
										placeholder="Nazwa użytkownika"
									/>
									<Form.Group widths="equal">
										<Form.Input
											fluid
											icon="lock"
											iconPosition="left"
											placeholder="Hasło"
											type="password"
										/>
										<Form.Input
											fluid
											icon="lock"
											iconPosition="left"
											placeholder="Powtórz hasło"
											type="password"
										/>
									</Form.Group>

									<Button color="blue" fluid size="large">
										Zarejestruj
									</Button>
								</Segment>
							</Form>
							<Message floating>
								Masz już konto? <a href="/register"> Zaloguj się</a>
							</Message>
						</Grid.Column>
					</Grid>
				</Grid.Column>
			</Grid>
		);
	}
}

export default RegisterPage;
