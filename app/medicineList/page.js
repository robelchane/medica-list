"use client";
import { useState } from "react";
import Link from "next/link";

export default function MedicineList() {
  const [medicineData, setMedicineData] = useState({
    name: "",
    brand: "",
    quantity: "",
    description: "",
    dosage: "",
    expiry_date: "",
    price: "",
    category: "",
    manufacturer: "",
    activeIngredients: "",
    medicineType: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMedicineData({
      ...medicineData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/medicines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medicineData),
      });

      if (response.ok) {
        alert("Medicine listed successfully!");
        setMedicineData({
          name: "",
          brand: "",
          quantity: "",
          description: "",
          dosage: "",
          expiry_date: "",
          price: "",
          category: "",
          manufacturer: "",
          activeIngredients: "",
          medicineType: "",
        });
      } else {
        alert("Failed to list medicine.");
      }
    } catch (error) {
      console.error("Failed to list medicine", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-400 to-indigo-500">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 flex justify-between items-center px-8 fixed top-0 left-0 w-full z-10 shadow-md">
        <Link href="/" className="text-3xl font-bold hover:text-yellow-300 transition-colors">
          Medica List
        </Link>
        <nav className="space-x-6">
          <Link href="/medicineList" className="text-lg hover:text-yellow-300 transition-colors">
            List Medicine
          </Link>
          <Link href="/all-listings" className="text-lg hover:text-yellow-300 transition-colors">
            View Medicines
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <div className="mt-16 p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-700">
          List Your Medicine
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input
              name="name"
              type="text"
              placeholder="Medicine Name"
              value={medicineData.name}
              onChange={handleChange}
              required
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              name="brand"
              type="text"
              placeholder="Brand"
              value={medicineData.brand}
              onChange={handleChange}
              required
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={medicineData.quantity}
              onChange={handleChange}
              required
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={medicineData.price}
              onChange={handleChange}
              required
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={medicineData.description}
              onChange={handleChange}
              required
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              name="dosage"
              type="text"
              placeholder="Dosage"
              value={medicineData.dosage}
              onChange={handleChange}
              required
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <div>
              <label className="block text-base font-medium">Expiry Date</label>
            <input
              name="expiry_date"
              type="date"
              placeholder="Expiry Date"
              value={medicineData.expiry_date}
              onChange={handleChange}
              required
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            </div>
            <input
              name="category"
              type="text"
              placeholder="Category"
              value={medicineData.category}
              onChange={handleChange}
              required
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              name="manufacturer"
              type="text"
              placeholder="Manufacturer"
              value={medicineData.manufacturer}
              onChange={handleChange}
              required
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <textarea
              name="activeIngredients"
              placeholder="Active Ingredients (comma separated)"
              value={medicineData.activeIngredients}
              onChange={handleChange}
              required
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              name="medicineType"
              type="text"
              placeholder="Medicine Type"
              value={medicineData.medicineType}
              onChange={handleChange}
              required
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 col-span-full"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200"
            >
              {loading ? "Listing..." : "Publish Medicine"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
