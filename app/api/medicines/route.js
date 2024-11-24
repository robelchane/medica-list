import connectMongoDB from "../../../libs/mongodb";
import Medicine from "../../../models/medicine"; // Adjusted for Medicine model
import { NextResponse } from "next/server";

// POST request to create a new medicine
export async function POST(request) {
  const { name, brand, quantity, description, dosage, expiry_date, price, category, manufacturer, activeIngredients, medicineType } = await request.json();
  
  await connectMongoDB();
  
  // Create a new medicine with the provided fields
  await Medicine.create({ name, brand, quantity, description, dosage, expiry_date, price, category, manufacturer, activeIngredients, medicineType });
  
  return NextResponse.json({ message: "Medicine Created" }, { status: 201 });
}

// GET request to fetch all medicines with optional filters
export async function GET(request) {
  await connectMongoDB();
  
  const { searchParams } = request.nextUrl;
  const name = searchParams.get("name");
  const brand = searchParams.get("brand");
  const expiry_date = searchParams.get("expiry_date");
  
  // Build the query based on the filters provided
  const query = {};
  
  if (name) query.name = { $regex: name, $options: "i" }; // Case-insensitive search for name
  if (brand) query.brand = { $regex: brand, $options: "i" }; // Case-insensitive search for brand
  if (expiry_date) query.expiry_date = { $lte: new Date(expiry_date) }; // Filter by expiry_date (<= provided date)

  // Find all medicines matching the query and sort by expiry_date (ascending)
  const medicines = await Medicine.find(query).sort({ expiry_date: 1 }); // Sort from closest to farthest expiry date
  
  return NextResponse.json({ medicines });
}

// DELETE request to remove a medicine by ID
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  
  await connectMongoDB();
  
  // Delete the medicine with the specified ID
  await Medicine.findByIdAndDelete(id);
  
  return NextResponse.json({ message: "Medicine Deleted" }, { status: 200 });
}
