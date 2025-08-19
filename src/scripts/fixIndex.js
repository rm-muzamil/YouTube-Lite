import mongoose from "mongoose";

const MONGO_URI =
  "mongodb+srv://neurocodes:neurocodes@cluster0.la6lryj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // replace with your actual URI

async function fixIndex() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Connected to MongoDB");

    // Drop duplicate index
    await mongoose.connection.db.collection("users").dropIndex("username_1");

    console.log("Dropped index username_1 successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

fixIndex();
