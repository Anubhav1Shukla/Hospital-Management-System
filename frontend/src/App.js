//App.js
import React from 'react';
import {
	BrowserRouter as Router,
	Routes, Route,
	Link, useNavigate
} from 'react-router-dom';
// import Appointments
// 	from './components/Appointments';
// import Doctors from './components/Doctors';
// import Patients from './components/Patients';
import Appointments from './pages/Appointments';
import Doctors from './pages/Doctors';
import Patients from './pages/Patients';
import Login from './pages/Login';

import './App.css'

const App = () => {
	const isLinkActive =
		(path) =>
			window.location.pathname === path;
	return (
		<Router>
			<div className="container">
				<h1 style={{ color: "red" }}>
					Hospital Management System
				</h1>
				<nav>
					<ul>
						<li className={
							isLinkActive('/appointments')
								? 'active' : ''}>
							<Link to="/appointments">
								Appointments
							</Link>
						</li>
						<li className={
							isLinkActive('/doctors') ?
								'active' : ''}>
							<Link to="/doctors">
								Doctors
							</Link>
						</li>
						<li className={
							isLinkActive('/patients') ?
								'active' : ''}>
							<Link to="/patients">
								Patients
							</Link>
						</li>
						<li className={
							isLinkActive('/login') ?
								'active' : ''}>
							<Link to="/login">
								login
							</Link>
						</li>
					</ul>
				</nav>

				<Routes>
					<Route path="/appointments"
						element={<Appointments />} />
					<Route path="/"
						element={<Appointments />} />
					<Route path="/doctors"
						element={<Doctors />} />
					<Route path="/patients"
						element={<Patients />} />
					<Route path="/login"
						element={<Login />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
