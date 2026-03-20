import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useStore } from "../store";

export default function ScatterPlot() {
  const { filteredData, selectedId, setSelectedId } = useStore();

  // ✅ Add jitter to avoid overlapping
  const chartData = filteredData.map((d) => ({
    ...d,
    depthPlot: d.depth + (Math.random() - 0.5) * 1,   // small horizontal spread
    magPlot: d.mag + (Math.random() - 0.5) * 0.05,    // very small vertical spread
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
        <CartesianGrid stroke="#444" />

        {/* ✅ X Axis = ORIGINAL depth */}
        <XAxis
          type="number"
          dataKey="depthPlot"
          name="Depth"
          domain={["auto", "auto"]}
          tickCount={6}
          label={{ value: "Depth (km)", position: "bottom" }}
        />

        {/* ✅ Y Axis = ORIGINAL magnitude */}
        <YAxis
          type="number"
          dataKey="magPlot"
          name="Magnitude"
          domain={["auto", "auto"]}
          tickCount={8}
          label={{
            value: "Magnitude",
            angle: -90,
            position: "insideLeft",
          }}
        />

        {/* ✅ Better Tooltip */}
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          formatter={(value, name, props: any) => {
            if (name === "depthPlot") return [props.payload.depth + " km", "Depth"];
            if (name === "magPlot") return [props.payload.mag, "Magnitude"];
            return value;
          }}
          labelFormatter={() => ""}
        />

        {/* ✅ Scatter */}
        <Scatter
          data={chartData}
          onClick={(e: any) => setSelectedId(e.id)}
          shape={(props: any) => {
            const isSelected = props.payload.id === selectedId;

            return (
              <circle
                cx={props.cx}
                cy={props.cy}
                r={isSelected ? 7 : 4}
                fill={isSelected ? "#ff4d4d" : "#4da6ff"} // lighter blue
                opacity={0.6} // reduces clutter
              />
            );
          }}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}