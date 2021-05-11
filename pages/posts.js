/** @format */
import React from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import api from '../api';

const fetchPosts = async () => {
	//lag of 1 sec.
	await new Promise((r) => setTimeout(r, 1000));
	return api.get('/posts').then((res) => res.data.slice(0, 10));
};

const Posts = ({ serverData }) => {
	const { status, data, isFetching, error } = useQuery('posts', fetchPosts, {
		initialData: serverData,
		initialStale: true,
	});
	return (
		<>
			<h1>useQuery example</h1>

			{status === 'loading' ? (
				<div>Loading...</div>
			) : status === 'error' ? (
				<div>Error: {error.message}</div>
			) : (
				<>
					<h3>Posts {isFetching ? <small>...</small> : null}</h3>
					{/* // `data` will either resolve to the latest page's data
				// or if fetching a new page, the last successful page's data */}
					<ul>
						{data?.map((post) => (
							<li key={post.id}>
								<Link href='/[postId]' as={`/${post.id}`}>
									<a>{post.title}</a>
								</Link>
							</li>
						))}
					</ul>
				</>
			)}
			<Link href='/'>
				<a>
					<h2>
						Click here for <strong>usePaginatedQuery</strong> Example
					</h2>
				</a>
			</Link>

			<ReactQueryDevtools initialIsOpen />
		</>
	);
};
export const getServerSideProps = async () => {
	const serverData = await fetchPosts();
	return { props: { serverData } };
};
export default Posts;
