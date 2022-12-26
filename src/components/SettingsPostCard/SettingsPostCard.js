import axios from 'axios';
import { useContext, useRef, useState } from 'react';
import { MeContext } from '../../context/MeContext';
import { Input } from '../Input/Input';
import { Modal } from '../Modal/Modal';

export const SettingsPostCard = ({ item, getPosts }) => {
	const { title, id, body } = item;

	const [editModal, setEditModal] = useState(false);

	const titleRef = useRef();
	const bodyRef = useRef();
	const date = new Date();
	const { me } = useContext(MeContext);

	const [posts, setPosts] = useState([]);

	const handleFormSubmit = (evt) => {
		evt.preventDefault();
		console.log(titleRef.current, bodyRef.current);

		axios
			.put(`http://localhost:8080/posts/${id}`, {
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
					setEditModal(false);
					getPosts();
				}
			})
			.catch((error) => console.log(error));
	};

	const handleDelete = () => {
		axios
			.delete(`http://localhost:8080/posts/${id}`)
			.then((res) => {
				if (res.status === 200) {
					setEditModal(false);
					getPosts();
				}
			})
			.catch((error) => console.log(error));
	};

	return (
		<>
			<li className="list-group-item shadow d-flex justify-content-between mb-3 align-items-center">
				<strong>{title}</strong>
				<button
					onClick={() => setEditModal(true)}
					className="btn btn-warning"
				>
					Edit
				</button>
			</li>
			{editModal ? (
				<Modal title={'Edit or Delete post'} setModal={setEditModal}>
					<form
						onSubmit={handleFormSubmit}
						className="d-flex flex-column justify-content-center"
					>
						<Input ref={titleRef} type="text" placeholder="Title" />
						<Input ref={bodyRef} type="text" placeholder="Body" />
						<button className="btn btn-success w-25">Edit</button>
						<button
							onClick={handleDelete}
							className="btn btn-danger w-25"
						>
							Delete
						</button>
					</form>
				</Modal>
			) : (
				''
			)}
		</>
	);
};
