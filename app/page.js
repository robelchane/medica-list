import React from 'react';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="min-h-screen bg-cyan-200 flex flex-col items-center justify-between"> {/* Full background applied here */}
      {/* Fixed Header */}
      <header className="bg-blue-600 w-full py-4 text-white text-center fixed top-0 left-0 z-10">
        <h1 className="text-3xl font-bold">Welcome to the Medicine Listing</h1>
      </header>
      
      {/* Main Content */}
      <main className="flex flex-col items-center mt-24"> {/* Adjusted for fixed header */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Choose an Option</h2>

        {/* Option Links */}
        <div className="flex flex-col space-y-6">
          <Link href="./medicineList">
            <div className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl text-center hover:bg-blue-700 transition duration-300">
              List Medicines
            </div>
          </Link>

          <Link href="/all-listings">
            <div className="bg-green-500 text-white px-8 py-4 rounded-lg text-xl text-center hover:bg-green-700 transition duration-300">
              See Medicines
            </div>
          </Link>

          <Link href="./manager">
            <div className="bg-yellow-500 text-white px-8 py-4 rounded-lg text-xl text-center hover:bg-yellow-700 transition duration-300">
              Manage Medicines
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-4 text-center mt-8">
        <p>&copy; 2024 Medicine List. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Page;
