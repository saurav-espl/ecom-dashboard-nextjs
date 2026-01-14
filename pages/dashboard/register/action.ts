import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import User from "@/pages/models/user"
import connectMongoDB from "@/pages/lib/mongodb";

export default async function POST(req:any) {
  try {
    const { name, email, phone, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({ name, email, phone, address, password: hashedPassword });

    console.log("Name: ", name);
    console.log("Email: ", email);
    console.log("Phone: ", phone);
    console.log("Address: ", address);
    console.log("Password: ", password);

    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An Error While Registered" },
      { status: 500 }
    );
  }
}
