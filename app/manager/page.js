"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Manager() {
  const [medicines, setMedicines] = useState([]); // State to hold the fetched medicine listings
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    name: "",
    brand: "",
    expiry_date: "",
  });

  // Fetch medicines based on filters
  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filter).toString(); // Use 'filter' here for the query string
      const response = await fetch(`/api/medicines?${query}`); // Call the backend API route with filters
      const data = await response.json(); // Parse the response as JSON
      setMedicines(data.medicines || []); // Update the medicines state with the fetched data, defaulting to empty array if no medicines
    } catch (error) {
      console.error("Failed to fetch medicines", error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Fetch all medicines when the component mounts (without filters)
  useEffect(() => {
    fetchMedicines(); // Call the fetch function to load medicines on mount
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle changes in filter inputs
  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  // Handle form submission for filtering medicines
  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchMedicines(); // Fetch medicines with the applied filters
  };

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/medicines/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMedicines(medicines.filter((medicine) => medicine._id !== id)); // Update the state after deletion
        alert("Medicine deleted successfully.");
      } else {
        alert("Failed to delete medicine.");
      }
    } catch (error) {
      console.error("Error deleting medicine:", error);
      alert("Failed to delete medicine.");
    }
  };

  return (
    <div className="py-8 px-4 mt-16 bg-teal-100">
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

      {/* Filter Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-4 gap-4 mb-8 text-black">
        <div>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={filter.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <input
            name="brand"
            type="text"
            placeholder="Brand"
            value={filter.brand}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <input
            name="expiry_date"
            type="date"
            placeholder="Expiry Date"
            value={filter.expiry_date}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="col-span-4 flex justify-center items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            <FontAwesomeIcon icon={faSearch} /> Search
          </button>
        </div>
      </form>

      {/* Loading spinner */}
      {loading && <p>Loading medicines...</p>}

      {/* Card-style Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {medicines.length > 0 ? (
          medicines.map((medicine) => (
            <div
              key={medicine._id}
              className="border p-4 rounded-lg shadow-md bg-white hover:bg-gray-100 transition-all duration-200"
            >
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold mb-2">{medicine.name}</h2>
                <p className="text-lg text-gray-700">
                  <span className="text-blue-600">$</span>
                  {medicine.price}
                </p>
                <p className="text-gray-600 text-sm mt-2">{medicine.description}</p>
                <p className="text-sm text-gray-500 mt-2">Brand: {medicine.brand}</p>
                <p className="text-sm text-gray-500">Category: {medicine.category}</p>
                <p className="text-sm text-gray-500">Dosage: {medicine.dosage}</p>
                <p className="text-sm text-gray-500">Expiry: {new Date(medicine.expiry_date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">Manufacturer: {medicine.manufacturer}</p>
                <p className="text-sm text-gray-500">Stock: {medicine.quantity}</p>
                <p className="text-sm text-gray-500">Active Ingredients: {medicine.activeIngredients.join(", ")}</p>
                <p className="text-sm text-gray-500">Type: {medicine.medicineType}</p>
                
                {/* Edit and Delete Buttons */}
                <div className="flex justify-between w-full mt-4">
                  <Link href={`/edit-medicine/${medicine._id}`} className="text-blue-600 hover:text-blue-800">
                    <FontAwesomeIcon icon={faPen} /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(medicine._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No medicines found.</p>
        )}
      </div>
    </div>
  );
}
