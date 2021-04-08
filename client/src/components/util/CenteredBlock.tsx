/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from "react";

interface ICenteredBlockProps {
	title: string,
	children: React.ReactNode,
}

const CenteredBlock = ({ title, children }: ICenteredBlockProps) => {
	return (
		<div css={css`
			text-align: center;
		`}>
			<h1 css={css`
				margin-bottom: 24px;
			`}>{title}</h1>
			<div>
				{children}
			</div>
		</div>
	);
};

export default CenteredBlock;
