import React, {useState} from "react";
import DataChart from "./DataChart";
import useAsyncEffect from "use-async-effect";
import LoadingSpinner from "../util/LoadingSpinner";

const ChartScreen = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	// Intl.DateTimeFormat().resolvedOptions().timeZone
	// https://stackoverflow.com/a/34602679
	useAsyncEffect(async () => {
		const dataReq = await fetch("/api/mergedData?start=2021-04-18T00:00:00Z&end=2021-04-18T02:00:00Z&tz=America/New_York#");
		const json = await dataReq.json();
		setLoading(false);
		setData(json.data);
	}, [])

	if (loading) {
		return <LoadingSpinner content={"Loading data..."} />
	}

	return (
		<div>
			<DataChart data={data}/>
		</div>
	);
};

export default ChartScreen;
