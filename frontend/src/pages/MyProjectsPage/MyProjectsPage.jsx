import React from 'react';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

class MyProjectsPage extends React.Component {
    render() {
        return (
            <div>
				<Sidebar />
				<Navbar />
				<div className="vu-content">
					<div className="container-fluid column-flex">
						<div className="vu-box">
							<div>
								<h1>Moje projekty</h1>
								<div>
									<table className="lessons-table">
									<thead>
										<tr className="vu-center"><th>ID</th><th>Tytul</th><th>Rozpoczęcie</th><th>Zakończenie</th><th>Opiekun</th><th>Kierownik</th><th>Klucz</th><th>Członkowie</th></tr>
									</thead>
									<tbody>
										<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
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

export default MyProjectsPage;