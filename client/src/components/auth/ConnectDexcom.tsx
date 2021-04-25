/** @jsxImportSource @emotion/react */
import React, {useState} from "react";
import CenteredBlock from "../util/CenteredBlock";
import {Button, Form} from "react-bootstrap";
import {css} from "@emotion/react";

const ConnectDexcom = () => {
	const [useProdDexAPI, setUseProdDexAPI] = useState(false);

	return <CenteredBlock title={"Let's link your blood sugar data"}>
		<p>Click the button below to authorize access to readings from your Dexcom continuous glucose monitor.</p>

		<Button
			css={css`
					background: #59A618;
					border-color: #59A618;
				`}
			href="/auth/dexcom?">Connect your Dexcom account</Button>

		<Form>
			<Form.Row>
				<Form.Group controlId="use-real-dexcom">
					<Form.Check type="checkbox"
					            label="Use production Dexcom API"
					            onChange={event => setUseProdDexAPI(event.target.checked)} />
				</Form.Group>
			</Form.Row>
		</Form>
	</CenteredBlock>
};

export default ConnectDexcom;
