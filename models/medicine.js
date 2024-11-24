import mongoose, { Schema } from "mongoose";

const medicineSchema = new Schema(
  {   
    name: String,                     // Name of the medicine
    brand: String,                    // Brand of the medicine
    quantity: Number,                 // Quantity or stock of the medicine
    description: String,              // Brief description of the medicine
    dosage: String,                   // Dosage information (e.g., 500mg)
    expiry_date: Date,                // Expiry date of the medicine
    price: Number,                    // Price of the medicine
    category: String,                 // Category of the medicine (e.g., "Painkiller", "Antibiotic")
    manufacturer: String,             // Manufacturer of the medicine
    activeIngredients: [String],      // List of active ingredients in the medicine
    medicineType: String,             // Type of medicine (e.g., "Tablet", "Syrup")
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
  }
);

const Medicine = mongoose.models.Medicine || mongoose.model("Medicine", medicineSchema);

export default Medicine;
