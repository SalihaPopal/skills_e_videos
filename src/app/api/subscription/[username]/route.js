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
    const user = await auth.getSubscriber(username);
    if (!user) {
      return Response.json({ message: "Subscriber not found" }, { status: 404 });
    }
    return Response.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching subscriber", error);
    return Response.json({ message: "Error fetching subscriber" }, { status: 500 });
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
    
    const updatedSubscriber = await auth.updateSubscriber(username, email, password, profile_img, subscribers);

    return new Response(JSON.stringify(updatedSubscriber), { status: 200 });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Error updating subscriber" }),
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
    return Response.json(await auth.deleteSubscriber(username));

  } catch (err) {
    return Response.json(
      { error: "Error deleting subscriber" },
      { status: 500 }
    );
  }
}
