import { Input } from '../../components/Input/Input';
import { useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { MeContext } from '../../context/MeContext';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

export const Register = () => {
	const firstName = useRef();
	const lastName = useRef();
	const email = useRef();
	const password = useRef();
	const { setToken } = useContext(AuthContext);
	const { setMe } = useContext(MeContext);
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			name: '',
			lastname: '',
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
			if (values.lastname === '') {
				errors.lastname = 'required';
			}
			return errors;
		},
	});

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
			onSubmit={(handleInputValue, formik.handleSubmit)}
			className="w-50 mx-auto mt-5 shadow p-5"
		>
			<h2 className="text-center fw-bold mb-5">Register</h2>
			<Input
				ref={firstName}
				type="text"
				className="form-control"
				placeholder="First name"
				name="name"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.name}
			/>
			{formik.touched.name && formik.errors.name ? (
				<span className="fs-6 text-danger">Please enter name</span>
			) : (
				''
			)}
			<Input
				ref={lastName}
				type="text"
				className="form-control my-3"
				placeholder="Last name"
				name="lastname"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.lastname}
			/>
			{formik.touched.lastname && formik.errors.lastname ? (
				<span className="fs-6 text-danger">Please enter lastname</span>
			) : (
				''
			)}
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
					Please enter password
				</span>
			) : (
				''
			)}
			<button type="submit" className="btn btn-primary mt-3">
				Submit
			</button>
		</form>
	);
};
