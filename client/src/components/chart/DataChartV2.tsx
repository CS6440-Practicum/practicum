import React from 'react';
import {ChartContainer} from "react-timeseries-charts";

function DataChartV2({ data }: any) {
	console.log(data.timerange);

	return (
		<ChartContainer timeRange={data.timerange()}>

		</ChartContainer>
	);
}

export default DataChartV2;
