import React from "react";
import XYFrame from "semiotic/lib/XYFrame"

const DataChart = () => {
	/**
	 * Based on sample code provided in the Semiotic docs at https://semiotic.nteract.io/guides/scatterplot
	 */
	const frameProps = {
		/* --- Data --- */
		points: [{ theaterCount: 4, rank: 18, grossWeekly: 327616, title: "Ex Machina" },
			{ theaterCount: 39, rank: 15, grossWeekly: 1150814, title: "Ex Machina" } ],

		/* --- Size --- */
		size: [700,400],
		margin: { left: 60, bottom: 90, right: 10, top: 40 },

		/* --- Process --- */
		xAccessor: "theaterCount",
		yAccessor: "rank",
		yExtent: [0],
		xExtent: [0],

		/* --- Customize --- */
		pointStyle: (d: any) => {
			return {
				r: 5,
				fill:
					d.title === "Ex Machina"
						? "#ac58e5"
						: d.title === "Far from the Madding Crowd"
						? "#E0488B"
						: "#9fd0cb"
			}
		},
		title: (
			<text textAnchor="middle">
				Theaters showing <tspan fill={"#ac58e5"}>Ex Machina</tspan> vs{" "}
				<tspan fill={"#E0488B"}>Far from the Madding Crowd</tspan>
			</text>
		),
		axes: [{ orient: "left", label: "Rank" },
			{ orient: "bottom", label: { name: "Theaters", locationDistance: 55 } }]
	}

	// @ts-ignore
	return (
		<div>
			{/*@ts-ignore*/}
			<XYFrame {...frameProps} />
		</div>
	);
};

export default DataChart;
