import React, {useState} from 'react';
import useAsyncEffect from "use-async-effect";
import Login from "./components/auth/Login";
import {Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import LoadingSpinner from "./components/util/LoadingSpinner";

interface AuthState {
	loading?: boolean
	authenticated: boolean,
	name?: string,
	email?: string,
	googleAuthComplete?: boolean,
	dexcomAuthComplete?: boolean
}

function App() {
	const [authStatus, setAuthStatus] = useState<AuthState>({authenticated: false, loading: true});

	useAsyncEffect((async () => {
		const userResp = await fetch("/auth/user", {
			credentials: "include"
		});

		setAuthStatus(await userResp.json());
	}), [setAuthStatus /* list all dependent variables used in the effect here - props, etc. */])



	return <>
		<Navbar bg="dark" expand="lg" variant="dark">
			<Navbar.Brand href="#home">Glucose Tracker</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav"/>
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="/">Home</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
		<Container style={{marginTop: 5}}>
			<Row>
				<Col>
					<LoadingSpinner active={authStatus.loading} />
					{authStatus.authenticated && !authStatus.loading ? <p>You are logged in!</p> : ""}
					{!authStatus.authenticated && !authStatus.loading ? <Login/> : ""}
				</Col>
			</Row>
		</Container>
	</>;
}

export default App;
