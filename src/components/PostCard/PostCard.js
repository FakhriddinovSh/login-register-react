import { Link } from 'react-router-dom';

export const PostCard = ({ data }) => {
	const { user_name, create_at, body, title } = data;
	return (
		<li className="me-4 mb-3">
			<div className="card" style={{ width: '18rem' }}>
				<div className="card-body">
					<h5 className="card-title">{title}</h5>
					<h6 className="card-subtitle mb-2 text-muted">
						Author: <span>{user_name}</span>
					</h6>
					<p className="card-text">{body}</p>
					<time>{create_at}</time>
					<Link to="/post/1" className="card-link d-block">
						Card link
					</Link>
				</div>
			</div>
		</li>
	);
};
