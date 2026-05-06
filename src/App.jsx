import { scaleLinear, scaleOrdinal, scaleSqrt } from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { data } from "./data";

const MARGIN = {
  top: 20,
  right: 20,
  bottom: 80,
  left: 80,
};
const width = 500;
const height = 500;

const continents = ["Europe", "Asia", "Africa", "Oceania", "Americas"];

export default function App() {
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = scaleLinear().domain([0, 50000]).range([0, boundsWidth]);
  const yScale = scaleLinear().domain([35, 85]).range([boundsHeight, 0]);
  const sizeScale = scaleSqrt().domain([0, 2000000000]).range([3, 30]);
  const colorScale = scaleOrdinal()
    .domain(["Europe", "Asia", "Africa", "Oceania", "Americas"])
    .range(["#a7b088", "#d5bf51", "#f09b15", "#d35616", "#ad3c36"]);

  return (
    <div className="main-div">
      <h1>Poor people die younger</h1>
      <h2>Life expectancy at birth is correlated to the GDP per capita</h2>
      <svg width={width} height={height}>
        <rect width={width} height={height} fill="#f9f9f9" />

        <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
          <rect width={boundsWidth} height={boundsHeight} fill="#f2f2f2" />

          {data.map((d, i) => (
            <circle
              key={i}
              cx={xScale(d.gdpPercap)}
              cy={yScale(d.lifeExp)}
              r={sizeScale(d.pop)}
              fill={colorScale(d.continent)}
              fillOpacity="0.6"
              stroke={colorScale(d.continent)}
            />
          ))}
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={60}
              boundsHeight={boundsHeight}
              label="GDP per capita [USD] →"
            />
          </g>
          <AxisLeft
            yScale={yScale}
            pixelsPerTick={40}
            boundsWidth={boundsWidth}
            label="Life expectancy at birth →"
          />
          <g transform="translate(230, 220)">
            <rect width={150} height={160} fill="#f9f9f9" rx={10} />
            <text className="dataTitle" x={10} y={20} fontSize={14}>
              Continent
            </text>
            {continents.map((d, i) => (
              <>
                <circle
                  key={i}
                  cx={20}
                  cy={40 + i * 25}
                  r={8}
                  fill={colorScale(d)}
                  fillOpacity="0.6"
                  stroke={colorScale(d)}
                />
                <text
                  x={35}
                  y={40 + i * 25}
                  fontSize={12}
                  dominantBaseline="middle"
                >
                  {d}
                </text>
              </>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
