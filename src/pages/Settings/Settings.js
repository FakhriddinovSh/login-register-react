import React, { useContext, useEffect, useRef, useState } from 'react';
import { Modal } from '../../components/Modal/Modal';
import { Input } from '../../components/Input/Input';
import { MeContext } from '../../context/MeContext';
import axios from 'axios';
import { SettingsPostCard } from '../../components/SettingsPostCard/SettingsPostCard';

export const Settings = () => {
	const [addPostModal, setAddPostModal] = useState(false);
	const { me } = useContext(MeContext);
	const titleRef = useRef();
	const bodyRef = useRef();
	const date = new Date();

	const [posts, setPosts] = useState([]);

	const getPosts = async () => {
		const data = await axios.get(
			`http://localhost:8080/posts?user_id=${me.id}`,
		);
		setPosts(data.data);
	};

	useEffect(() => {
		getPosts();
	}, []);

	const handleFormSubmit = (evt) => {
		evt.preventDefault();

		console.log(titleRef.current, bodyRef.current);

		axios
			.post('http://localhost:8080/posts', {
				user_id: me.id,
				title: titleRef.current.value,
				body: bodyRef.current.value,
				user_name: me.firstname + '' + me.lastname,
				create_at:
					date.toLocaleDateString() +
					' ' +
					date.toLocaleTimeString().substring(0, 5),
			})
			.then((res) => {
				if (res.status === 201) {
					getPosts();
					setAddPostModal(false);
				}
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="container">
			<h3 className="text-center my-3">Settings</h3>
			<button
				onClick={() => setAddPostModal(true)}
				className="btn btn-success"
			>
				Add Post +
			</button>

			<h4 className="my-5">My posts</h4>

			{posts.length ? (
				<ul className="list-group">
					{posts.map((item) => (
						<SettingsPostCard
							key={item.id}
							item={item}
							getPosts={getPosts}
						/>
					))}
				</ul>
			) : (
				''
			)}

			{addPostModal ? (
				<Modal title="Add post" setModal={setAddPostModal}>
					<form
						onSubmit={handleFormSubmit}
						className="d-flex flex-column justify-content-center"
					>
						<Input ref={titleRef} type="text" placeholder="Title" />
						<Input ref={bodyRef} type="text" placeholder="Body" />
						<button className="btn btn-success w-25">Send</button>
					</form>
				</Modal>
			) : (
				''
			)}
		</div>
	);
};
