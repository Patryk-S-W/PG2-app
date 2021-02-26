import React from 'react';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

class SendRaportPage extends React.Component {
    render() {
        return (
            <div>
				<Sidebar />
				<Navbar />
				<div className="vu-content">
					<div className="container-fluid column-flex">
						<div className="vu-box">
						<h1 className="hheader">student project4</h1>
						<table className="lessons-table">
							<tbody>
							<tr><th>Opiekun:</th><td>opiekun</td></tr>
							<tr><th>Klucz:</th><td>!h%6r</td></tr>
							<tr><th>Kierownik:</th><td>kierownik</td></tr>
							<tr><th>Data rozpoczecia:</th><td>2019-09-07 19:10:25</td></tr>
							<tr><th>Data zakończenia:</th><td>2019-09-07 19:10:25</td></tr>
							<tr><th>Członkowie:</th><td><li>kierownik</li><li>user</li><li>student2</li></td></tr>
							<tr><th>Opis:</th><td>test description</td></tr>
							</tbody>
						</table>
					<div className="upload-box">
						<h3 className="hheader">Prześlij raport</h3>
						<input type="file" name="file" onChange={this.onChangeHandler}/>    
						<button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Prześlij raport</button> 
					</div>
					
					<div className="upload-box">
						<h3 className="hheader">Dodaj komentarz</h3>
						<textarea  rows="4"  cols="50"/>    
						<button type="button" className="btn btn-success btn-block">Wyślij</button> 
					</div>
					</div>
				  </div>
				</div>
            </div>
        );
    }
}

export default SendRaportPage;