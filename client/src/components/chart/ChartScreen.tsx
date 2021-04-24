import React, {useState} from "react";
import useAsyncEffect from "use-async-effect";
import LoadingSpinner from "../util/LoadingSpinner";
import {Index, TimeSeries} from "pondjs";
import DataChartV2 from "./DataChartV2";
import CenteredBlock from "../util/CenteredBlock";

export interface MergedDataPoint {
	timestamp: string,
	egv: number,
	heartPoints: number,
}

const ChartScreen = () => {
	const [loading, setLoading] = useState(true);
	const [egvTimeSeries, setEgvTimeSeries] = useState(null);
	const [hpTimeSeries, setHpTimeSeries] = useState(null);
	// Intl.DateTimeFormat().resolvedOptions().timeZone
	// https://stackoverflow.com/a/34602679
	useAsyncEffect(async () => {
		const dataReq = await fetch("/api/mergedData?start=2021-04-19T04:00:00Z&end=2021-04-20T04:00:00Z&tz=America/New_York");
		const json = await dataReq.json();
		console.log(json.data.map((pt: MergedDataPoint) => [new Date(pt.timestamp).getTime(), pt.egv, pt.heartPoints]));
		const timeSeries = new TimeSeries({
			name: "egvData",
			columns: ["time", "egv"],
			points: json.data.map((pt: MergedDataPoint) => [new Date(pt.timestamp).getTime(), pt.egv]),
		});
		setEgvTimeSeries(timeSeries);

		const hpSeries = new TimeSeries({
			name: "hpData",
			columns: ["index", "heartPoints"],
			points: json.data.map((pt: MergedDataPoint) => [Index.getIndexString("5m", new Date(pt.timestamp).getTime()), pt.heartPoints]),
		})
		setHpTimeSeries(hpSeries);
		setLoading(false);
	}, [setEgvTimeSeries, setLoading])

	if (loading) {
		return <LoadingSpinner active={true} content={"Loading data..."} />
	}

	if (!egvTimeSeries) {
		return <CenteredBlock title={"No data"}><p>No data was available for this time period</p></CenteredBlock>
	}

	return (
		<div>
			{/* @ts-ignore */}
			<h1>Showing data from {egvTimeSeries.timerange().humanize()}</h1>
			{/* @ts-ignore */}
			<h2>{egvTimeSeries.size()} data points loaded</h2>

			<DataChartV2 egvData={egvTimeSeries} hpData={hpTimeSeries} />
		</div>
	);
};

export default ChartScreen;
