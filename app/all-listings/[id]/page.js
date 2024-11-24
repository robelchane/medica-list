"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Import useParams for Next.js 13
import Link from "next/link";

export default function MedicineDetail() {
  const { id } = useParams(); // Get the medicine ID directly from the URL
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch the specific medicine data by ID
      const fetchMedicine = async () => {
        try {
          const response = await fetch(`/api/medicines/${id}`);
          const data = await response.json();
          if (response.ok) {
            setMedicine(data.medicine);
          } else {
            setError("Medicine not found");
          }
        } catch (err) {
          setError("Error fetching medicine data");
        } finally {
          setLoading(false);
        }
      };

      fetchMedicine();
    }
  }, [id]);

  if (loading) return <p className="text-center text-lg text-gray-500">Loading...</p>;

  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <main className="flex flex-col items-center mt-16 min-h-screen bg-gradient-to-br from-cyan-500 via-blue-400 to-indigo-500">
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
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-[#001f3f] text-3xl font-serif mb-8">
          Medicine Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <strong className="text-lg text-[#001f3f]">Medicine Name:</strong>
            <span className="text-lg text-gray-700">{medicine.name}</span>
          </div>
          <div>
            <strong className="text-lg text-[#001f3f]">Brand:</strong>
            <span className="text-lg text-gray-700">{medicine.brand}</span>
          </div>
          <div>
            <strong className="text-lg text-[#001f3f]">Quantity:</strong>
            <span className="text-lg text-gray-700">{medicine.quantity}</span>
          </div>
          <div>
            <strong className="text-lg text-[#001f3f]">Description:</strong>
            <span className="text-lg text-gray-700">{medicine.description}</span>
          </div>
          <div>
            <strong className="text-lg text-[#001f3f]">Dosage:</strong>
            <span className="text-lg text-gray-700">{medicine.dosage}</span>
          </div>
          <div>
            <strong className="text-lg text-[#001f3f]">Expiry Date:</strong>
            <span className="text-lg text-gray-700">
              {new Date(medicine.expiry_date).toLocaleDateString()}
            </span>
          </div>
          <div>
            <strong className="text-lg text-[#001f3f]">Price:</strong>
            <span className="text-lg text-gray-700">${medicine.price}</span>
          </div>
          <div>
            <strong className="text-lg text-[#001f3f]">Category:</strong>
            <span className="text-lg text-gray-700">{medicine.category}</span>
          </div>
          <div>
            <strong className="text-lg text-[#001f3f]">Manufacturer:</strong>
            <span className="text-lg text-gray-700">{medicine.manufacturer}</span>
          </div>
          <div>
            <strong className="text-lg text-[#001f3f]">Active Ingredients:</strong>
            <span className="text-lg text-gray-700">{medicine.activeIngredients.join(", ")}</span>
          </div>
          <div>
            <strong className="text-lg text-[#001f3f]">Medicine Type:</strong>
            <span className="text-lg text-gray-700">{medicine.medicineType}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
