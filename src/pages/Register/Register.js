import { Input } from '../../components/Input/Input';
import { useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { MeContext } from '../../context/MeContext';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
	const firstName = useRef();
	const lastName = useRef();
	const email = useRef();
	const password = useRef();

	const { setToken } = useContext(AuthContext);
	const { setMe } = useContext(MeContext);

	const navigate = useNavigate();

	const handleInputValue = (evt) => {
		evt.preventDefault();
		axios
			.post('http://localhost:8080/register', {
				email: email.current.value,
				firstname: firstName.current.value,
				lastname: lastName.current.value,
				password: password.current.value,
			})

			.then((res) => {
				if (res.status === 201) {
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
			<h2 className="text-center fw-bold mb-5">Register</h2>
			<Input
				ref={firstName}
				type="text"
				className="form-control"
				placeholder="First name"
			/>
			<Input
				ref={lastName}
				type="text"
				className="form-control my-3"
				placeholder="Last name"
			/>
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
