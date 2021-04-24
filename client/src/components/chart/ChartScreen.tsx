import React, {useState} from "react";
import useAsyncEffect from "use-async-effect";
import LoadingSpinner from "../util/LoadingSpinner";
import {TimeSeries} from "pondjs";
import DataChartV2 from "./DataChartV2";
import CenteredBlock from "../util/CenteredBlock";

export interface MergedDataPoint {
	timestamp: string,
	egv: number,
	heartPoints: number,
}

const ChartScreen = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	// Intl.DateTimeFormat().resolvedOptions().timeZone
	// https://stackoverflow.com/a/34602679
	useAsyncEffect(async () => {
		const dataReq = await fetch("/api/mergedData?start=2021-04-18T00:00:00Z&end=2021-04-18T02:00:00Z&tz=America/New_York");
		const json = await dataReq.json();

		const timeSeries = new TimeSeries({
			name: "mergedData",
			columns: ["time", "egv", "heartPoints"],
			points: json.data.map((pt: MergedDataPoint) => [new Date(pt.timestamp).getTime(), pt.egv, pt.heartPoints])
		});
		setData(timeSeries);
		setLoading(false);
	}, [setData, setLoading])

	if (loading) {
		return <LoadingSpinner active={true} content={"Loading data..."} />
	}

	if (!data) {
		return <CenteredBlock title={"No data"}><p>No data was available for this time period</p></CenteredBlock>
	}

	return (
		<div>
			{/* @ts-ignore */}
			<h1>Showing data from {data.timerange().humanize()}</h1>
			{/* @ts-ignore */}
			<h2>{data.events.length} data points loaded</h2>

			<DataChartV2 data={data} />
		</div>
	);
};

export default ChartScreen;
