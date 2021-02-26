import React from 'react';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

class AllUsersPage extends React.Component {
    render() {
        return (
            <div>
				<Sidebar />
				<Navbar />
				<div className="vu-content">
					<div className="container-fluid column-flex">
						<div className="vu-box">
							<div>
								<h1>Wszyscy użytkownicy</h1>
								<div>
									<table className="lessons-table">
									<thead>
										<tr className="vu-center"><th>ID</th><th>Imię</th><th>Nazwisko</th><th>Firma</th><th>E-mail</th><th>Telefon</th><th>Rola</th></tr>
									</thead>
									<tbody>
										<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
									</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
            </div>
        );
    }
}

export default AllUsersPage;