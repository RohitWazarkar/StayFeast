"use client";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/users");
      const data = await res.json();
      console.log(data);
      setUsers(data);
    }
    fetchUsers();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Users List</h1>

      {/* Debug raw data */}
      <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(users, null, 2)}</pre>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="space-y-2 mt-4">
          {users.map((user) => (
            <li key={user.id} className="border p-3 rounded bg-black-100">
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
