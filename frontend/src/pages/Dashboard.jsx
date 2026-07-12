import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { api } from "../api/client";

const kpis = [
  ["activeVehicles", "Active Vehicles"],
  ["availableVehicles", "Available Vehicles"],
  ["maintenanceVehicles", "In Maintenance"],
  ["activeTrips", "Active Trips"],
  ["pendingTrips", "Pending Trips"],
  ["driversOnDuty", "Drivers On Duty"],
  ["fleetUtilization", "Fleet Utilization %"]
];

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({ type: "", status: "", region: "" });

  useEffect(() => {
    api("/analytics/dashboard").then(setData).catch(console.error);
  }, []);

  if (!data) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <h2 className="text-2xl font-black">Dashboard</h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400">Live fleet KPIs and operational status.</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {["type", "status", "region"].map((item) => (
            <input
              key={item}
              className="input"
              placeholder={`Filter ${item}`}
              value={filters[item]}
              onChange={(e) => setFilters({ ...filters, [item]: e.target.value })}
            />
          ))}
        </div>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(([key, label]) => (
          <div key={key} className="panel">
            <p className="text-sm font-bold text-slate-500 dark:text-zinc-400">{label}</p>
            <p className="mt-2 text-3xl font-black">{data[key]}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="panel h-80">
          <h3 className="mb-3 font-black">Vehicle Status</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={data.vehicleStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#1e8a6a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="panel h-80">
          <h3 className="mb-3 font-black">Driver Status</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={data.driverStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#d97706" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
