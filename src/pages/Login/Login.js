import { Input } from '../../components/Input/Input';
import { useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { MeContext } from '../../context/MeContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
	const email = useRef();
	const password = useRef();

	const navigate = useNavigate();

	const { setToken } = useContext(AuthContext);
	const { setMe } = useContext(MeContext);

	const handleInputValue = (evt) => {
		evt.preventDefault();
		axios
			.post('http://localhost:8080/login', {
				email: email.current.value,
				password: password.current.value,
			})

			.then((res) => {
				console.log(res.data);
				if (res.status === 200) {
					setToken(res.data.accessToken);
					setMe(res.data.user);
					navigate('/');
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<form
			onSubmit={handleInputValue}
			className="w-50 mx-auto mt-5 shadow p-5"
		>
			<h2 className="text-center fw-bold mb-5">Login</h2>
			<p>
				Sizda account yo'qmi <Link to={'/register'}>Register</Link>
			</p>
			<Input
				ref={email}
				type="Email"
				className="form-control"
				placeholder="Email"
			/>
			<Input
				ref={password}
				type="Password"
				className="form-control my-3"
				placeholder="Password"
			/>
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};
