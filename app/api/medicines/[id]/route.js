// app/api/medicines/[id]/route.js
// Reference
// https://webdev2.warsylewicz.ca/week-8/fetching-data

import connectMongoDB from "../../../../libs/mongodb";
import Medicine from "../../../../models/medicine"; // Adjusted for Medicine model
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    await connectMongoDB();

    // Fetch the medicine by ID
    const medicine = await Medicine.findById(id);

    if (!medicine) {
      return NextResponse.json({ message: "Medicine not found" }, { status: 404 });
    }

    return NextResponse.json({ medicine }, { status: 200 });
  } catch (error) {
    console.error("Error fetching medicine by ID:", error);
    return NextResponse.json({ message: "Failed to fetch medicine" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const data = await request.json(); // Get the data from the request body

    // Find the medicine by ID and update it with the new data
    const updatedMedicine = await Medicine.findByIdAndUpdate(id, data, { new: true });

    if (!updatedMedicine) {
      return NextResponse.json({ message: "Medicine not found" }, { status: 404 });
    }

    return NextResponse.json({ medicine: updatedMedicine }, { status: 200 });
  } catch (error) {
    console.error("Error updating medicine:", error);
    return NextResponse.json({ message: "Failed to update medicine" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connectMongoDB();

    // Find the medicine by ID and delete it
    const deletedMedicine = await Medicine.findByIdAndDelete(id);

    if (!deletedMedicine) {
      return NextResponse.json({ message: "Medicine not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Medicine deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting medicine:", error);
    return NextResponse.json({ message: "Failed to delete medicine" }, { status: 500 });
  }
}
