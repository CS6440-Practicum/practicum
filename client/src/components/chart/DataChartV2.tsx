import React from 'react';
import {
	BarChart,
	Baseline,
	ChartContainer,
	ChartRow,
	Charts,
	Resizable,
	ScatterChart,
	styler,
	YAxis
} from 'react-timeseries-charts'

const style = styler([
	{key: "egv", color: "black"},
	{key: "heartPoints", color: "red"}
])

function DataChartV2({egvData, hpData}: any) {
	return (
		<Resizable>
			<ChartContainer timeRange={egvData.timerange()}
			                width={600}
			>
				<ChartRow height="150">
					<YAxis id="egv" label="Blood sugar (mg/dL)" min={40} max={400} width="60" type="linear" format=","/>
					<Charts>
						<BarChart axis="heartPoints" series={hpData} columns={["heartPoints"]} style={style}/>
						<ScatterChart axis="egv"
						              series={egvData}
						              columns={["egv"]}
						              style={style}
						/>
						<Baseline axis="egv" value={70}/>
						<Baseline axis="egv" value={180}/>
					</Charts>
					<YAxis id="heartPoints" label="Heart points" min={0} max={10} width="60"
					       type="linear" format=","/>
				</ChartRow>
			</ChartContainer>
		</Resizable>
	);
}

export default DataChartV2;
