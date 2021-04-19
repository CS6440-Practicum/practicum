import React from "react";
import {scaleTime} from "d3-scale";
import {ResponsiveXYFrame} from "semiotic";

interface DataChartProps {
	data: any, //TODO
}

const DataChart = ({data}: DataChartProps) => {
	// @ts-ignore
	return <ResponsiveXYFrame
		responsiveWidth={true}
		axes={[
			{
				orient: "left",
				// @ts-ignore
				label: "Blood sugar (mg/dL)"
			},
			{
				orient: "bottom",
				// @ts-ignore
				label: "Time",
				tickFormat: (d: any) => d.getHours() + ":" + d.getMinutes()
			}
		]}
		points={data}
		xAccessor={(d: any) => new Date(d.timestamp).getTime()}
		yAccessor="egv"
		// @ts-ignore
		xScaleType={scaleTime()}
		yExtent={[40, 400]}
	/>;
};

export default DataChart;
