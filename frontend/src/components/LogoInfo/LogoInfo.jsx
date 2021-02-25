import React from 'react';

import { logowrapper, logo, logoSmall, logoSmaller } from './LogoInfo.css';

class LogoInfo extends React.Component {
	render() {
		return (
			<div className={logowrapper}>
				<span className={logo} title="Projekty Grupowe Politechniki Gdańskiej">
					PG²
				</span>

				<span className={logoSmall} title="Projekty Grupowe Politechniki Gdańskiej">
					Projekty Grupowe Politechniki Gdańskiej
				</span>
				<div className={logoSmaller}>
					Projekty Grupowe Politechniki Gdańskiej to system umożliwiający zarządzanie projektami grupowymi na
					wydziale Fizyki Technicznej i Matematyki Stosowanej.
				</div>
				<div className={logoSmaller}>
					Pozwala opiekunom, studentom, a także firmom na łatwe zarządzanie projektami i generowanie raportów.
				</div>
			</div>
		);
	}
}

export default LogoInfo;
