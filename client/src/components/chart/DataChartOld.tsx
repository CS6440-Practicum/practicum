import React from "react";

// import {OrdinalFrame} from "semiotic";

interface DataChartProps {
	data: any, //TODO
}

const DataChartOld = ({data}: DataChartProps) => {
	return <p>Empty</p>;
	// return <OrdinalFrame
	// 	data={data}
	// 	size={[700, 500]}
	// 	type={{
	// 		type: "point",
	// 		// @ts-ignore
	// 		customMark: d => {
	// 			if (d.rIndex === 1) {
	// 				return <circle r={6} />;
	// 			}
	// 			return <rect height={d.scaledValue} width={20} x={-10} />;
	// 		}
	// 	}}
	// 	connectorType={(e: any) => 0 !== e.rIndex && e.rIndex}
	// 	oPadding={10}
	//
	// 	oAccessor={ (d: any) => {
	// 		console.log("oAccessor d", d);
	// 		return new Date(d.timestamp).getTime()
	// 	}}
	//
	// 	// @ts-ignore
	// 	rAccessor={["heartPoints", "egv"]}
	// 	rExtent={[0]}
	// 	// @ts-ignore
	// 	// oScaleType={scaleTime(new Date(data[0].timestamp).getTime(), new Date(data[data.length - 1].timestamp).getTime())}
	//
	// 	axes={[
	// 		{
	// 			key: "heartPoints-axis",
	// 			orient: "right",
	// 			// @ts-ignore
	// 			label: "Heart Points",
	// 			extentOverride: [0, 10],
	// 		},
	// 		{
	// 			key: "egv-axis",
	// 			orient: "left",
	// 			// @ts-ignore
	// 			label: "Blood sugar (mg/dL)",
	// 			extentOverride: [40, 400],
	// 		},
	// 		{
	// 			orient: "bottom",
	// 			// @ts-ignore
	// 			label: "Time",
	// 			tickFormat: (d: any) => "hi"
	// 		}
	// 	]}
	//
	// 	multiAxis={true}
	// 	renderOrder={["pieces", "connectors"]}
	// 	// xAccessor={(d: any) => new Date(d.timestamp).getTime()}
	// 	// yAccessor="egv"
	// 	// xScaleType={scaleTime()}
	// 	// yExtent={[40, 400]}
	// />;
};

export default DataChartOld;
