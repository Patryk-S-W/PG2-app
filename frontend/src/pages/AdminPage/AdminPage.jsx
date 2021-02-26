import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

import LogoInfo from '@/components/LogoInfo';

class AdminPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Panel administratora</h1>
                <p>Jesteś zalogowany.</p>
                <div>
                    Wszyscy użytkownicy:
                        <ul>
                                <li></li>
                        </ul>
                </div>
            </div>
        );
    }
}

export default AdminPage;