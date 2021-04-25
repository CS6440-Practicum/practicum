import React, {SetStateAction, useState} from "react";
import useAsyncEffect from "use-async-effect";
import LoadingSpinner from "../util/LoadingSpinner";
import {Index, TimeSeries} from "pondjs";
import DataChartV2 from "./DataChartV2";
import CenteredBlock from "../util/CenteredBlock";
import DatePicker from "react-date-picker";
import {DateTime} from "luxon";
import {Alert} from "react-bootstrap";

export interface MergedDataPoint {
	timestamp: string,
	egv: number,
	heartPoints: number,
}

const ChartScreen = () => {
	const [loading, setLoading] = useState(false);
	const [egvTimeSeries, setEgvTimeSeries] = useState(null);
	const [hpTimeSeries, setHpTimeSeries] = useState(null);
	const [date, setDate] = useState(new Date());
	const [maxDate, _] = useState(new Date());

	useAsyncEffect(async () => {
		setLoading(true);
		const start = DateTime.fromJSDate(date).startOf("day").setZone("utc").toISO();
		const end = DateTime.fromJSDate(date).endOf("day").setZone("utc").toISO();
		// get user's timezone as a string: https://stackoverflow.com/a/34602679
		const dataReq = await fetch(`/api/mergedData?start=${start}&end=${end}&tz=${Intl.DateTimeFormat().resolvedOptions().timeZone}`);
		const json = await dataReq.json()

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
	}, [date, setEgvTimeSeries, setLoading])

	return (
		<>
			<h1>Exercise Impact Chart</h1>
			<p>View Heart Points from Google Fit alongside your Dexcom CGM readings to visualize how exercise could
				be influencing your blood sugar levels. Data is shown in your local timezone.</p>


			<DatePicker
				onChange={date => setDate(date as SetStateAction<Date>)}
				disabled={loading}
				value={date}
				maxDate={maxDate}
			/>

			<LoadingSpinner active={loading} content={"Loading data..."}/>

			{/* @ts-ignore */}
			{!loading && (!egvTimeSeries || (egvTimeSeries && !egvTimeSeries.count())) && <>
				<CenteredBlock title={"Aww, shucks!"}>
					<div>
						<p>No data was available for {DateTime.fromJSDate(date).toLocaleString()}.</p>
						{DateTime.fromJSDate(date).hasSame(DateTime.now(), "day")
							&& <Alert variant="warning" className="mt-3">
							Data from Dexcom is made available with a 3-hour delay. If you're trying to access the
							latest information, try again in a few hours.
						</Alert>}
					</div>
				</CenteredBlock>
			</>}

			{/* @ts-ignore */}
			{!loading && egvTimeSeries && egvTimeSeries.count() > 0 &&
				<>
					{/* @ts-ignore */}
                    <p className="mt-2 mb-3">Data available from {DateTime.fromJSDate(egvTimeSeries.timerange().begin()).toLocaleString(DateTime.TIME_SIMPLE)} to {DateTime.fromJSDate(egvTimeSeries.timerange().end()).toLocaleString(DateTime.TIME_SIMPLE)}</p>
                    <DataChartV2 egvData={egvTimeSeries} hpData={hpTimeSeries} />
				</>
			}

			<a href={"/auth/dexcom?force=true"} className="align-content-center">Reconnect/Change Dexcom account</a>
		</>
	);
}

export default ChartScreen;
