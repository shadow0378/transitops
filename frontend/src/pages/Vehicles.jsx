import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api/client";
import StatusBadge from "../components/StatusBadge";

const empty = {
  registrationNumber: "",
  name: "",
  type: "Van",
  region: "West",
  maxLoadCapacity: 500,
  odometer: 0,
  acquisitionCost: 0,
  status: "Available"
};

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  async function load() {
    setVehicles(await api("/vehicles"));
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      await api("/vehicles", { method: "POST", body: JSON.stringify(form) });
      setForm(empty);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-black">Vehicles</h2>
      <form onSubmit={submit} className="panel grid gap-3 md:grid-cols-4">
        {["registrationNumber", "name", "type", "region", "maxLoadCapacity", "odometer", "acquisitionCost"].map((field) => (
          <input
            key={field}
            className="input"
            placeholder={field}
            type={["maxLoadCapacity", "odometer", "acquisitionCost"].includes(field) ? "number" : "text"}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            required
          />
        ))}
        <button className="btn"><Plus size={18} /> Add Vehicle</button>
        {error && <p className="md:col-span-4 text-sm font-bold text-red-600">{error}</p>}
      </form>

      <div className="panel overflow-x-auto">
        <table className="table">
          <thead>
            <tr><th>Registration</th><th>Name</th><th>Type</th><th>Region</th><th>Capacity</th><th>Odometer</th><th>Status</th></tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v._id}>
                <td className="font-bold">{v.registrationNumber}</td>
                <td>{v.name}</td>
                <td>{v.type}</td>
                <td>{v.region}</td>
                <td>{v.maxLoadCapacity} kg</td>
                <td>{v.odometer} km</td>
                <td><StatusBadge value={v.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
