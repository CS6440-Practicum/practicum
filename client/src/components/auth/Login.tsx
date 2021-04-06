import React from "react";
import {Image} from "react-bootstrap";
import GoogleSignInBtn from "../../img/btn_google_signin.png";

const Login = () => {
	return (
		<div style={{textAlign: "center"}}>
			<h1>Sign in to continue</h1>
			<br />
			<a href="/auth/google">
				<Image src={GoogleSignInBtn} alt={"Sign in with Google"} width={200}/>
			</a>
		</div>
	);
};

export default Login;
