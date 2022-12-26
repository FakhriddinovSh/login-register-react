import { Link, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { MeContext } from '../context/MeContext';
import { Posts } from '../pages/Posts/Posts';
import { Settings } from '../pages/Settings/Settings';

export const Private = () => {
	const { token, setToken } = useContext(AuthContext);
	const { me, setMe } = useContext(MeContext);

	return (
		<div className="container">
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<Link className="navbar-brand" to={'/'}>
						Private logo
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div
						className="collapse navbar-collapse"
						id="navbarSupportedContent"
					>
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link
									className="nav-link active"
									aria-current="page"
									to="/"
								>
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/posts">
									Posts
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="dropdown me-5">
					<button
						className="btn btn-secondary dropdown-toggle rounded-pill"
						type="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						{me.firstname.charAt(0) + me.lastname.charAt(0)}
					</button>
					<ul className="dropdown-menu">
						<li>
							<Link to={'/settings'} className="dropdown-item">
								Settings
							</Link>
						</li>
						<li>
							<button
								onClick={() => setToken('')}
								className="dropdown-item"
								to="#"
							>
								Log out
							</button>
						</li>
					</ul>
				</div>
			</nav>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<h2>Private Home Page</h2>
							<p>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Quidem sit laudantium facilis
								laborum corporis ipsam nemo totam possimus
								assumenda harum?
							</p>
						</>
					}
				/>
				<Route path="/posts" element={<Posts />} />
				<Route path="/settings" element={<Settings />} />
			</Routes>
		</div>
	);
};
