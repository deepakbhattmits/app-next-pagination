/** @format */
import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

const fetchPosts = async (_, page = 0) => {
	const { data } = await axios.get('/api/posts', {
		params: { page },
	});
	return data;
};
const InfiniteQuery = () => {
	const {
		status,
		data,
		error,
		isFetching,
		isPreviousData,
		canFetchMore,
		fetchMore,
	} = useInfiniteQuery('posts', fetchPosts, {
		getFetchMore: (lastPage) => lastPage.nextPageOffset,
	});
	return (
		<>
			<h1>infinite Query example</h1>
			<Link href='/'>
				<a>
					<h2>
						Click here for <strong>usePaginatedQuery</strong> Example
					</h2>
				</a>
			</Link>
			{status === 'loading' ? (
				<div>Loading...</div>
			) : status === 'error' ? (
				<div>Error: {error.message}</div>
			) : (
				// `data` will either resolve to the latest page's data
				// or if fetching a new page, the last successful page's data
				<div>
					{data.map((page, index) => (
						<React.Fragment key={index}>
							{page.posts?.map((project) => (
								<p key={project.id}>{project.name}</p>
							))}
						</React.Fragment>
					))}
					<button
						className='ui button'
						disabled={!canFetchMore}
						onClick={() => fetchMore()}>
						{canFetchMore ? 'Fetch More' : 'No More Data to fetch'}
					</button>
				</div>
			)}

			<ReactQueryDevtools initialIsOpen />
		</>
	);
};
export default InfiniteQuery;
