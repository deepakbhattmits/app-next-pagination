/** @format */

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<meta name='description' content='a site for my programming' />
					<meta charSet='utf-8' />
					<meta name='robots' content='noindex, nofollow' />
					<link
						rel='stylesheet'
						href='https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css'
					/>
					<link
						rel='stylesheet'
						href='https://fonts.googleapis.com/css2?family=Roboto'
					/>
				</Head>
				<body className='body ui container'>
					<Main />
					<NextScript />
				</body>
				<style jsx>{`
					.ui * {
						font-family: 'Roboto', sans-serif;
					}
					// .body {
					// 	background: #ededed;
					// 	overflow: hidden;
					// }
				`}</style>
			</Html>
		);
	}
}

export default MyDocument;
