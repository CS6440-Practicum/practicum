import React from "react";
import CenteredBlock from "./CenteredBlock";

interface IErrorProps {
	title?: string,
	message: string
}

const Error = ({ title, message }: IErrorProps) => {
	if (!title) { title = "That didn't work..."; }

	return <CenteredBlock title={title}>
		<p>{message}</p>
	</CenteredBlock>
};

export default Error;
