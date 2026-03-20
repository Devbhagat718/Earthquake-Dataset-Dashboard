// src/components/Filters.tsx
import { useState } from "react";
import { useStore } from "../store";

export default function Filters({ regions }: { regions: string[] }) {
  const { data, setFilteredData } = useStore();
  const [minMag, setMinMag] = useState(1);
  const [region, setRegion] = useState("All");

  const applyFilters = (newMag: number, newRegion: string) => {
    let filtered = data.filter((d) => d.magInt >= newMag);

    if (newRegion !== "All") {
      filtered = filtered.filter((d) => d.region === newRegion);
    }

    setFilteredData(filtered);
  };

  return (
    <div className="filters">
      <div>
        <label>Min Magnitude: {minMag}</label>
        <input
          type="range"
          min={1}
          max={10}
          value={minMag}
          onChange={(e) => {
            const val = Number(e.target.value);
            setMinMag(val);
            applyFilters(val, region);
          }}
        />
      </div>

      <div>
        <label>Region:</label>
        <select
          value={region}
          onChange={(e) => {
            const val = e.target.value;
            setRegion(val);
            applyFilters(minMag, val);
          }}
        >
          <option>All</option>
          {regions.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>
    </div>
  );
}