import { scaleLinear, scaleSqrt } from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { data } from "./data";

const MARGIN = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 50,
};
const width = 500;
const height = 500;

export default function App() {
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = scaleLinear().domain([0, 50000]).range([0, boundsWidth]);
  const yScale = scaleLinear().domain([35, 85]).range([boundsHeight, 0]);
  return (
    <div className="main-div">
      <h1>This is the main title</h1>
      <h2>
        This is the longer description, explaining what this chart is about
      </h2>
      <svg width={width} height={height}>
        <rect width={width} height={height} fill="#000000" />
        <g></g>
      </svg>
    </div>
  );
}
