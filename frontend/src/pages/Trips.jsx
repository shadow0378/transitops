import { CheckCircle2, Send, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api/client";
import StatusBadge from "../components/StatusBadge";

const empty = {
  source: "",
  destination: "",
  vehicle: "",
  driver: "",
  cargoWeight: 100,
  plannedDistance: 50,
  revenue: 0
};

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState(empty);
  const [message, setMessage] = useState("");

  async function load() {
    const [tripRows, vehicleRows, driverRows] = await Promise.all([
      api("/trips"),
      api("/vehicles?dispatchable=true"),
      api("/drivers?available=true")
    ]);
    setTrips(tripRows);
    setVehicles(vehicleRows);
    setDrivers(driverRows);
    setForm((prev) => ({
      ...prev,
      vehicle: prev.vehicle || vehicleRows[0]?._id || "",
      driver: prev.driver || driverRows[0]?._id || ""
    }));
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);

  async function submit(e) {
    e.preventDefault();
    setMessage("");
    try {
      await api("/trips", { method: "POST", body: JSON.stringify(form) });
      setForm(empty);
      await load();
    } catch (err) {
      setMessage(err.message);
    }
  }

  async function action(id, path, body = {}) {
    setMessage("");
    try {
      await api(`/trips/${id}/${path}`, { method: "POST", body: JSON.stringify(body) });
      await load();
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-black">Trips</h2>
      <form onSubmit={submit} className="panel grid gap-3 md:grid-cols-4">
        <input className="input" placeholder="Source" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} required />
        <input className="input" placeholder="Destination" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} required />
        <select className="input" value={form.vehicle} onChange={(e) => setForm({ ...form, vehicle: e.target.value })} required>
          <option value="">Select available vehicle</option>
          {vehicles.map((v) => <option key={v._id} value={v._id}>{v.registrationNumber} - {v.name}</option>)}
        </select>
        <select className="input" value={form.driver} onChange={(e) => setForm({ ...form, driver: e.target.value })} required>
          <option value="">Select available driver</option>
          {drivers.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
        </select>
        <input className="input" type="number" placeholder="Cargo kg" value={form.cargoWeight} onChange={(e) => setForm({ ...form, cargoWeight: e.target.value })} required />
        <input className="input" type="number" placeholder="Distance km" value={form.plannedDistance} onChange={(e) => setForm({ ...form, plannedDistance: e.target.value })} required />
        <input className="input" type="number" placeholder="Revenue" value={form.revenue} onChange={(e) => setForm({ ...form, revenue: e.target.value })} />
        <button className="btn"><Send size={18} /> Create Draft</button>
        {message && <p className="md:col-span-4 text-sm font-bold text-red-600">{message}</p>}
      </form>

      <div className="panel overflow-x-auto">
        <table className="table">
          <thead>
            <tr><th>Route</th><th>Vehicle</th><th>Driver</th><th>Cargo</th><th>Distance</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {trips.map((t) => (
              <tr key={t._id}>
                <td className="font-bold">{t.source} to {t.destination}</td>
                <td>{t.vehicle?.registrationNumber}</td>
                <td>{t.driver?.name}</td>
                <td>{t.cargoWeight} kg</td>
                <td>{t.plannedDistance} km</td>
                <td><StatusBadge value={t.status} /></td>
                <td className="flex flex-wrap gap-2">
                  {t.status === "Draft" && <button className="btn-secondary" onClick={() => action(t._id, "dispatch")}><Send size={16} /> Dispatch</button>}
                  {t.status === "Dispatched" && <button className="btn-secondary" onClick={() => action(t._id, "complete", { finalOdometer: (t.vehicle?.odometer || 0) + t.plannedDistance, revenue: t.revenue, fuelLiters: 20, fuelCost: 2100 })}><CheckCircle2 size={16} /> Complete</button>}
                  {["Draft", "Dispatched"].includes(t.status) && <button className="btn-secondary" onClick={() => action(t._id, "cancel")}><XCircle size={16} /> Cancel</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
