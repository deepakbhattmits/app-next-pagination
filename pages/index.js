/** @format */
import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { usePaginatedQuery, queryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

const App = () => {
	return (
		<>
			<Example />
		</>
	);
};
export default App;

const fetchProjects = async (_, page = 0) => {
	const { data } = await axios.get('/api/projects', {
		params: { page },
	});
	return data;
};

const Example = () => {
	const [page, setPage] = React.useState(0);

	const {
		status,
		resolvedData,
		error,
		isFetching,
		isPreviousData,
	} = usePaginatedQuery(['projects', page], fetchProjects, {});

	// Prefetch the next page!
	React.useEffect(() => {
		if (resolvedData?.hasMore) {
			// prefetch next page
			queryCache.prefetchQuery(['projects', page + 1], fetchProjects);
		}
	}, [resolvedData, page]);

	return (
		<div>
			<Link href='/infiniteQuery'>
				<a>
					<h1>
						Click here for <strong>useInfiniteQuery</strong> Example
					</h1>
				</a>
			</Link>
			<Link href='/posts'>
				<a>
					<h1>
						Click here for <strong>useQuery</strong> Example
					</h1>
				</a>
			</Link>
			<p>
				In this example, each page of data remains visible as the next page is
				fetched. The buttons and capability to proceed to the next page are also
				supressed until the next page cursor is known. Each page is cached as a
				normal query too, so when going to previous pages, you'll see them
				instantaneously while they are also refetched invisibly in the
				background.
			</p>
			{status === 'loading' ? (
				<div>Loading...</div>
			) : status === 'error' ? (
				<div>Error: {error.message}</div>
			) : (
				// `data` will either resolve to the latest page's data
				// or if fetching a new page, the last successful page's data
				<div>
					{resolvedData.projects.map((project) => (
						<p key={project.id}>{project.name}</p>
					))}
				</div>
			)}
			<div>Current Page: {page + 1}</div>
			<button
				className='ui button green'
				onClick={() => setPage((old) => Math.max(old - 1, 0))}
				disabled={page === 0}>
				Previous Page
			</button>
			<button
				className='ui button green'
				onClick={() => {
					setPage((old) => (resolvedData?.hasMore ? old + 1 : old));
				}}
				disabled={isPreviousData || !resolvedData?.hasMore}>
				Next Page
			</button>
			{
				// Since the last page's data potentially sticks around between page requests,
				// we can use `isFetching` to show a background loading
				// indicator since our `status === 'loading'` state won't be triggered
				isFetching ? <span> Loading...</span> : null
			}{' '}
			<ReactQueryDevtools initialIsOpen />
		</div>
	);
};
