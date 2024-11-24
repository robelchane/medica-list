"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Import useParams for Next.js 13
import Link from "next/link";

export default function EditMedicine() {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ask for confirmation before updating
    const isConfirmed = window.confirm("Are you sure you want to update this medicine?");
    
    if (!isConfirmed) {
      return; // If the user clicks "Cancel", do not submit the form
    }

    // Prepare the data to update
    const updatedMedicine = {
      ...medicine,
      name: event.target.name.value,
      brand: event.target.brand.value,
      quantity: event.target.quantity.value,
      description: event.target.description.value,
      dosage: event.target.dosage.value,
      expiry_date: event.target.expiry_date.value,
      price: event.target.price.value,
      category: event.target.category.value,
      manufacturer: event.target.manufacturer.value,
      activeIngredients: event.target.activeIngredients.value.split(",").map((ingredient) => ingredient.trim()),
      medicineType: event.target.medicineType.value,
    };

    try {
      const response = await fetch(`/api/medicines/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedMedicine),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Display success prompt using alert
        alert("Medicine updated successfully!"); // Show a prompt with success message
        setTimeout(() => {
          window.location.href = "/manager"; // Redirect after successful update
        }, 2000); // Wait 2 seconds before redirecting
      } else {
        alert("Failed to update medicine"); // Show failure prompt
      }
    } catch (err) {
      alert("Error updating medicine"); // Show error prompt if request fails
    }
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <main className="flex flex-col items-center bg-cyan-400">
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
      <div className="py-8 px-4 mt-24 max-w-4xl w-full">
        <h2 className="text-center text-[#001f3f] text-4xl font-serif mb-8">
          Edit Medicine
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-base font-medium">Medicine Name</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={medicine.name}
              className="w-full p-2 border bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="brand" className="block text-base font-medium">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              defaultValue={medicine.brand}
              className="w-full p-2 border bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-base font-medium">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              defaultValue={medicine.quantity}
              className="w-full p-2 border bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-base font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              defaultValue={medicine.description}
              className="w-full p-2 border bg-white"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="dosage" className="block text-base font-medium">Dosage</label>
            <input
              type="text"
              id="dosage"
              name="dosage"
              defaultValue={medicine.dosage}
              className="w-full p-2 border bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="expiry_date" className="block text-base font-medium">Expiry Date</label>
            <input
              type="date"
              id="expiry_date"
              name="expiry_date"
              defaultValue={medicine.expiry_date.split("T")[0]} // Format the date for input
              className="w-full p-2 border bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-base font-medium">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              defaultValue={medicine.price}
              className="w-full p-2 border bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-base font-medium">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              defaultValue={medicine.category}
              className="w-full p-2 border bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="manufacturer" className="block text-base font-medium">Manufacturer</label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              defaultValue={medicine.manufacturer}
              className="w-full p-2 border bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="activeIngredients" className="block text-base font-medium">Active Ingredients</label>
            <input
              type="text"
              id="activeIngredients"
              name="activeIngredients"
              defaultValue={medicine.activeIngredients.join(", ")} // Display as comma-separated list
              className="w-full p-2 border bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="medicineType" className="block text-base font-medium">Medicine Type</label>
            <select
              id="medicineType"
              name="medicineType"
              defaultValue={medicine.medicineType}
              className="w-full p-2 border bg-white"
              required
            >
              <option value="Tablet">Tablet</option>
              <option value="Syrup">Syrup</option>
              <option value="Capsule">Capsule</option>
              <option value="Injection">Injection</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-2 bg-[#001f3f] text-white font-semibold rounded-lg"
          >
            Update Medicine
          </button>
        </form>
      </div>
    </main>
  );
}
