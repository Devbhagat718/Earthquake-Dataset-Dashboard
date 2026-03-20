import { useEffect, useState } from "react";
import Papa from "papaparse";
import { useStore } from "./store";
import type { Earthquake } from "./store";
import ScatterPlot from "./components/ScatterPlot";
import DataTable from "./components/DataTable";
import Filters from "./components/Filters";
import "./App.css";

function App() {
  const { setData } = useStore();
  const [regions, setRegions] = useState<string[]>([]);

  useEffect(() => {
    Papa.parse("/earthquakes_refined.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const data = result.data as Earthquake[];
        setData(data);

        const uniqueRegions = Array.from(
          new Set(data.map((d) => d.region))
        ).sort();

        setRegions(uniqueRegions);
      },
    });
  }, []);

  return (
    <div className="container">
      <h1>🌍 Earthquake Dashboard</h1>

      <Filters regions={regions} />

      <div className="layout">
        <div className="chart">
          <ScatterPlot />
        </div>

        <div className="table">
          <DataTable />
        </div>
      </div>
    </div>
  );
}

export default App;