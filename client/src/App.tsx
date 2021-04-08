/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React, {useState} from 'react';
import useAsyncEffect from "use-async-effect";
import Login from "./components/auth/Login";
import {Col, Container, Row} from "react-bootstrap";
import LoadingSpinner from "./components/util/LoadingSpinner";
import {Navigation} from "./components/nav/Navigation";
import Error from "./components/util/Error";
import ConnectDexcom from "./components/auth/ConnectDexcom";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ChartScreen from "./components/chart/ChartScreen";

interface IAuthState {
	loading?: boolean
	authenticated: boolean,
	name?: string,
	email?: string,
	googleAuthComplete?: boolean,
	dexcomAuthComplete?: boolean
}

export interface IUser {
	authenticated: boolean,
	name?: string,
	email?: string
}

function App() {
	const [authStatus, setAuthStatus] = useState<IAuthState>({authenticated: false, loading: true});

	useAsyncEffect((async () => {
		const userResp = await fetch("/auth/user", {
			credentials: "include"
		});

		setAuthStatus(await userResp.json());
	}), [setAuthStatus /* list all dependent variables used in the effect here - props, etc. */])

	return <Router>
		<Navigation user={{
			authenticated: authStatus.authenticated,
			name: authStatus.name,
			email: authStatus.email
		}}/>

		<Container css={css`
			margin-top: 16px;
		`}>
			<Switch>
				<Route exact path="/">
					<Row>
						<Col>
							<LoadingSpinner active={authStatus.loading}/>
							{authStatus.authenticated && !authStatus.loading
							&& !authStatus.googleAuthComplete && <Error
                                message={"You appear to be signed in but your Google account is not linked.  Please clear your cookies and refresh the page."}/>}
							{authStatus.authenticated && !authStatus.loading
							&& !authStatus.dexcomAuthComplete && <ConnectDexcom/>}
							{!authStatus.authenticated && !authStatus.loading && <Login/>}
							{!authStatus.loading && authStatus.authenticated
							&& authStatus.googleAuthComplete && authStatus.dexcomAuthComplete
							&& <ChartScreen />}
						</Col>
					</Row>
				</Route>
				<Route path="*">
					<Error title="Page not found" message="The page you're trying to go to doesn't exist" />
				</Route>
			</Switch>
		</Container>
	</Router>;
}

export default App;
