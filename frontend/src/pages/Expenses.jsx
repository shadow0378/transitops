import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [fuelLogs, setFuelLogs] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [expense, setExpense] = useState({ vehicle: "", type: "Toll", amount: 0, note: "" });
  const [fuel, setFuel] = useState({ vehicle: "", liters: 0, cost: 0, distance: 0 });

  async function load() {
    const [expenseRows, fuelRows, vehicleRows] = await Promise.all([api("/expenses"), api("/fuel-logs"), api("/vehicles")]);
    setExpenses(expenseRows);
    setFuelLogs(fuelRows);
    setVehicles(vehicleRows);
    setExpense((prev) => ({ ...prev, vehicle: prev.vehicle || vehicleRows[0]?._id || "" }));
    setFuel((prev) => ({ ...prev, vehicle: prev.vehicle || vehicleRows[0]?._id || "" }));
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);

  async function addExpense(e) {
    e.preventDefault();
    await api("/expenses", { method: "POST", body: JSON.stringify(expense) });
    await load();
  }

  async function addFuel(e) {
    e.preventDefault();
    await api("/fuel-logs", { method: "POST", body: JSON.stringify(fuel) });
    await load();
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-black">Fuel & Expenses</h2>
      <section className="grid gap-4 lg:grid-cols-2">
        <form onSubmit={addFuel} className="panel grid gap-3">
          <h3 className="font-black">Fuel Log</h3>
          <select className="input" value={fuel.vehicle} onChange={(e) => setFuel({ ...fuel, vehicle: e.target.value })}>{vehicles.map((v) => <option key={v._id} value={v._id}>{v.registrationNumber}</option>)}</select>
          <input className="input" type="number" placeholder="Liters" value={fuel.liters} onChange={(e) => setFuel({ ...fuel, liters: e.target.value })} />
          <input className="input" type="number" placeholder="Cost" value={fuel.cost} onChange={(e) => setFuel({ ...fuel, cost: e.target.value })} />
          <input className="input" type="number" placeholder="Distance" value={fuel.distance} onChange={(e) => setFuel({ ...fuel, distance: e.target.value })} />
          <button className="btn"><Plus size={18} /> Add Fuel</button>
        </form>

        <form onSubmit={addExpense} className="panel grid gap-3">
          <h3 className="font-black">Other Expense</h3>
          <select className="input" value={expense.vehicle} onChange={(e) => setExpense({ ...expense, vehicle: e.target.value })}>{vehicles.map((v) => <option key={v._id} value={v._id}>{v.registrationNumber}</option>)}</select>
          <select className="input" value={expense.type} onChange={(e) => setExpense({ ...expense, type: e.target.value })}>
            {["Toll", "Insurance", "Permit", "Maintenance", "Other"].map((x) => <option key={x}>{x}</option>)}
          </select>
          <input className="input" type="number" placeholder="Amount" value={expense.amount} onChange={(e) => setExpense({ ...expense, amount: e.target.value })} />
          <input className="input" placeholder="Note" value={expense.note} onChange={(e) => setExpense({ ...expense, note: e.target.value })} />
          <button className="btn"><Plus size={18} /> Add Expense</button>
        </form>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="panel overflow-x-auto">
          <h3 className="mb-3 font-black">Fuel Logs</h3>
          <table className="table"><thead><tr><th>Vehicle</th><th>Liters</th><th>Cost</th><th>Distance</th></tr></thead><tbody>{fuelLogs.map((f) => <tr key={f._id}><td>{f.vehicle?.registrationNumber}</td><td>{f.liters}</td><td>Rs {f.cost}</td><td>{f.distance} km</td></tr>)}</tbody></table>
        </div>
        <div className="panel overflow-x-auto">
          <h3 className="mb-3 font-black">Expenses</h3>
          <table className="table"><thead><tr><th>Vehicle</th><th>Type</th><th>Amount</th><th>Note</th></tr></thead><tbody>{expenses.map((ex) => <tr key={ex._id}><td>{ex.vehicle?.registrationNumber}</td><td>{ex.type}</td><td>Rs {ex.amount}</td><td>{ex.note}</td></tr>)}</tbody></table>
        </div>
      </section>
    </div>
  );
}
