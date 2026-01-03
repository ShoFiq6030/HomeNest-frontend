import React from "react";

export default function AdminDashboard() {
  return (
    <section className="px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-700">
          Welcome to the admin dashboard. Only admins can access this page.
        </p>
      </div>
    </section>
  );
}
