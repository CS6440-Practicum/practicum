import React from "react";
import {Image} from "react-bootstrap";
import GoogleSignInBtn from "../../img/btn_google_signin.png";
import CenteredBlock from "../util/CenteredBlock";

const Login = () => {
	return <CenteredBlock title="Sign in to continue">
		<a href="/auth/google">
			<Image src={GoogleSignInBtn} alt={"Sign in with Google"} width={200}/>
		</a>
	</CenteredBlock>;
};

export default Login;
