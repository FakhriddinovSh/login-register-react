import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PostCard } from '../../components/PostCard/PostCard';

export const Posts = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:8080/posts')
			.then((res) => {
				if (res.status === 200) {
					setPosts(res.data);
				}
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<>
			<h3 className="text-center my-3">Posts</h3>
			{posts.length ? (
				<ul className="list-unstyled d-flex flex-wrap">
					{posts.map((item) => (
						<PostCard key={item.id} data={item} />
					))}
				</ul>
			) : (
				''
			)}
		</>
	);
};
