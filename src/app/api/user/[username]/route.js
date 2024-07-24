const auth = require("../../auth.js");
import { headers } from "next/headers";

export async function GET() {
  const headersList = headers();
  const token = headersList.get("authorization");

  if (!token) {
    return Response.json({ message: "No token provided" }, { status: 401 });
  }
  try {
    const payload = auth.verifyToken(token);
    const username = payload["username"];
    const user = await auth.getUser(username);
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }
    return Response.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user", error);
    return Response.json({ message: "Error fetching user" }, { status: 500 });
  }
}


export async function PUT(request, route) {
  const headersList = headers();
  const token = headersList.get("authorization");
  if (!token) {
    return new Response(JSON.stringify({ message: "No token provided" }), { status: 401 });
  }

  try {
    const payload = auth.verifyToken(token);
    const username = payload["username"];
    const data = await request.json();
    
    const { email, password, profile_img, subscribers } = data;

    const subscribersInt = parseInt(subscribers, 10);
    if (isNaN(subscribersInt)) {
      throw new Error("Invalid subscribers value, must be an integer");
    }
    
    const updatedUser = await auth.updateUser(username, email, password, profile_img, subscribers);

    return new Response(JSON.stringify(updatedUser), { status: 200 });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Error updating user" }),
      { status: 500 }
    );
  }
}


export async function DELETE(request, route) {
  const headersList = headers();
  const token = headersList.get("authorization");
  if (!token) {
    return new Response(JSON.stringify({ message: "No token provided" }), { status: 401 });
  }
  try {
    const payload = auth.verifyToken(token);
    const username = payload["username"];
    return Response.json(await auth.deleteUser(username));

  } catch (err) {
    return Response.json(
      { error: "Error deleting user" },
      { status: 500 }
    );
  }
}
