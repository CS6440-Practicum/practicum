import {Nav, Navbar, NavLink} from "react-bootstrap";
import React from "react";
import {IUser} from "../../App";

interface NavProps {
	user: IUser
}

export function Navigation({ user }: NavProps) {
	return <Navbar bg="dark" expand="lg" variant="dark">
		<Navbar.Brand href="#home">Glucose Tracker</Navbar.Brand>
		<Navbar.Toggle aria-controls="basic-navbar-nav"/>
		<Navbar.Collapse id="basic-navbar-nav">
			<Nav className="mr-auto">
				{/*<Nav.Link href="/">Home</Nav.Link>*/}
			</Nav>
			{user.authenticated && <>
				<Navbar.Text className="justify-content-end">
					{user.name} ({user.email})
				</Navbar.Text>
                <Navbar.Text>
					<NavLink href="/auth/logout">Logout</NavLink>
                </Navbar.Text>
			</>}
		</Navbar.Collapse>
	</Navbar>;
}
