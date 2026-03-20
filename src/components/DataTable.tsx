import { useEffect, useRef } from "react";
import { useStore } from "../store";

export default function DataTable() {
  const { filteredData, selectedId, setSelectedId } = useStore();

  // store refs for each row
  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});

  // 🔥 Auto scroll when selectedId changes
  useEffect(() => {
    if (selectedId && rowRefs.current[selectedId]) {
      rowRefs.current[selectedId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedId]);

  return (
    <table>
      <thead>
        <tr>
          <th>Mag</th>
          <th>Depth</th>
          <th>Lat</th>
          <th>Lon</th>
          <th>Place</th>
          <th>Time</th>
        </tr>
      </thead>

      <tbody>
        {filteredData.map((d) => (
          <tr
            key={d.id}
            ref={(el) => {
            rowRefs.current[d.id] = el;
            }}
            className={d.id === selectedId ? "selected" : ""}
            onClick={() => setSelectedId(d.id)}
          >
            <td>{d.mag}</td>
            <td>{d.depth}</td>
            <td>{d.latitude}</td>
            <td>{d.longitude}</td>
            <td>{d.place}</td>
            <td>{d.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}