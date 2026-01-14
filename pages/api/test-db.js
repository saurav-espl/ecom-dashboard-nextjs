import connectDB from "../../lib/mongodb";

export default async function handler(req, res) {
    try {
        await connectDB();
        res.status(200).json({ message: "MongoDB connected successfully" });
        console.log("MongoDB connected successfully");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
