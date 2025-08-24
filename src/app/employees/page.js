"use client";
import { useEffect, useState } from "react";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    position: "",
    email: "",
    salary: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch employees
  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    const res = await fetch("/api/employees");
    const data = await res.json();
    setEmployees(data);
  }

  // Handle Add/Update
  async function handleSubmit(e) {
    e.preventDefault();

    if (isEditing) {
      // Update employee
      await fetch("/api/employees", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setIsEditing(false);
    } else {
      // Add employee
      await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setForm({ id: null, name: "", position: "", email: "", salary: "" });
    fetchEmployees();
  }

  // Set form for editing
  function handleEdit(emp) {
    setForm(emp);
    setIsEditing(true);
  }

const handleDelete = async (id) => {
  try {
    await fetch(`/api/employees?id=${id}`, {
      method: "DELETE",
    });
    // update UI after delete (refetch or filter)
    setEmployees(employees.filter((e) => e.id !== id));
  } catch (err) {
    console.error("Error deleting employee:", err);
  }
};

  return (
    <main className="p-8">
      <h1 className="text-3xl text-black font-bold mb-6">Employees</h1>

      {/* Add/Update Employee Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto space-y-4 border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-700 text-center">
          {isEditing ? "Update Employee" : "Add Employee"}
        </h2>

        <input
          className="border border-gray-300 text-black focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-lg w-full outline-none"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border border-gray-300 text-black focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-lg w-full outline-none"
          placeholder="Position"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
        />

        <input
          className="border border-gray-300 text-black focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-lg w-full outline-none"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="border border-gray-300 text-black focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-lg w-full outline-none"
          placeholder="Salary"
          type="number"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-md">
          {isEditing ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      {/* Employee List */}
      {employees.length === 0 ? (
        <p className="text-center text-gray-600 mt-6">No employees found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="border p-4 rounded-xl shadow bg-white text-black"
            >
              <p>
                <strong>ID:</strong> {emp.id}
              </p>
              <p>
                <strong>Name:</strong> {emp.name}
              </p>
              <p>
                <strong>Position:</strong> {emp.position}
              </p>
              <p>
                <strong>Email:</strong> {emp.email}
              </p>
              <p>
                <strong>Salary:</strong> ₹{emp.salary}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(emp)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(emp.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
