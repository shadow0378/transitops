import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { api, downloadCsv } from "../api/client";

export default function Reports() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api("/analytics/vehicle-performance").then(setRows).catch(console.error);
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-black">Reports</h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400">Fuel efficiency, operational cost, and ROI.</p>
        </div>
        <button className="btn" onClick={() => downloadCsv("transitops-vehicle-performance.csv", rows)}>
          <Download size={18} /> CSV Export
        </button>
      </div>

      <div className="panel h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="registrationNumber" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="roi" fill="#1e8a6a" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="panel overflow-x-auto">
        <table className="table">
          <thead>
            <tr><th>Vehicle</th><th>Name</th><th>Fuel Efficiency</th><th>Operational Cost</th><th>Revenue</th><th>ROI %</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.vehicleId}>
                <td className="font-bold">{r.registrationNumber}</td>
                <td>{r.name}</td>
                <td>{r.fuelEfficiency} km/l</td>
                <td>Rs {r.operationalCost}</td>
                <td>Rs {r.revenue}</td>
                <td>{r.roi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
