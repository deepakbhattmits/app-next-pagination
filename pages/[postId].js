/** @format */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import api from '../api';

const fetchPost = async (postId) => {
	//lag of 1 sec.
	await new Promise((r) => setTimeout(r, 1000));
	return api.get(`/posts/${postId}`).then((res) => res.data);
};
export const getServerSideProps = async ({ params: { postId } }) => {
	const post = await fetchPost(postId);
	return {
		props: {
			post,
		},
	};
};

const Post = ({ post }) => {
	const {
		query: { postId },
	} = useRouter();
	const { status, data, isFetching, error } = useQuery(
		['post', postId],
		() => fetchPost(postId),
		{ initialData: post, initialStale: true }
	);
	return (
		<>
			<Link href='/posts'>
				<a>Back</a>
			</Link>
			{status === 'loading' ? (
				<div>Loading...</div>
			) : status === 'error' ? (
				<div>Error: {error.message}</div>
			) : (
				// `data` will either resolve to the latest page's data
				// or if fetching a new page, the last successful page's data
				<>
					<h1>Post {isFetching ? <small>...</small> : null}</h1>
					<h2>{data.title}</h2>
					<p>
						<small> Post ID : {data.id}</small>
					</p>
					<p>Title:{data.body}</p>
				</>
			)}

			<ReactQueryDevtools initialIsOpen />
		</>
	);
};

export default Post;
