import { Input } from '../../components/Input/Input';
import { useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { MeContext } from '../../context/MeContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

export const Login = () => {
	const email = useRef();
	const password = useRef();

	const navigate = useNavigate();

	const { setToken } = useContext(AuthContext);
	const { setMe } = useContext(MeContext);

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
		},
		onSubmit: (values) => {
			console.log(values);
		},
		validate: (values) => {
			const errors = {};
			if (values.name === '') {
				errors.name = 'required';
			}
			if (values.email === '') {
				errors.email = 'required';
			}
			if (values.password === '') {
				errors.password = 'required';
			}
			return errors;
		},
	});

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
			onSubmit={(handleInputValue, formik.handleSubmit)}
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
				name="email"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.email}
			/>
			{formik.touched.email && formik.errors.email ? (
				<span className="fs-6 text-danger">Please enter email</span>
			) : (
				''
			)}
			<Input
				ref={password}
				type="Password"
				className="form-control my-3"
				placeholder="Password"
				name="password"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.password}
			/>
			{formik.touched.password && formik.errors.password ? (
				<span className="fs-6 text-danger d-block">
					Please enter Password
				</span>
			) : (
				''
			)}
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};
