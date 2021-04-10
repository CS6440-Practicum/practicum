/**
 * This file is based on the LoadingSpinner component from the HackGT Bolt project (licensed
 * under the MIT License) Evan worked on.
 *
 * https://github.com/HackGT/bolt/blob/master/client/src/components/util/LoadingSpinner.tsx
 */

import {Spinner} from "react-bootstrap";

type LoaderProps = {
	active?: boolean,
	content?: string,
}

function LoadingSpinner({active, content}: LoaderProps) {
	if (!active) {
		return <></>;
	}

	if (!content) {
		content = "Please wait..."
	}

	return <div style={{textAlign: "center", padding: 10}}>
		<Spinner animation="border" role="status">
			<span className="sr-only">{content}</span>
		</Spinner>
		<p style={{marginTop: 10}}>{content}</p>
	</div>;
}

export default LoadingSpinner;
