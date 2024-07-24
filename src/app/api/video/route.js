import { headers } from "next/headers";
const auth = require("../auth");

export async function GET() {
  console.log(await auth.getVideos());
  return Response.json(await auth.getVideos(), 
  { status: 200 });
}

export async function POST(request) {
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

    const data = await request.json();
    const {title, video_url, video_img_url, video_desc, views, tags, likes, dislikes} = data;
    const newVideo = await auth.AddVideo(
      title,
      video_url,
      video_img_url,
      video_desc,
      user.id, // Retrieve user_id from the user object
      views,
      tags,
      likes,
      dislikes
    );
    const videos = await auth.getVideos(username);
    return Response.json(videos, {
      status: 200,
      statusText: "New video added",
      newVideo,
    });
  } catch (error) {
    console.error("Failed to post the video", error);
    return Response.json(
      { message: "Failed to post the video" },
      { status: 403 }
    );
  }
}


