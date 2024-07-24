const auth = require("../../auth");
import {headers} from "next/headers";

export async function GET(req) {
  const headersList = headers();
  const token = headersList.get("authorization");
  const urlParams = new URL(req.url).searchParams;
  const searchTitle = urlParams.get('title') || '';
  const searchUrl = urlParams.get('url') || '';

  try {
    const payload = auth.verifyToken(token);
    const username = payload["username"];
    const videos = await auth.getVideo(username, searchTitle, searchUrl);
    return Response.json(videos, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Error fetching videos" }), { status: 500 });
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
    const user = await auth.getUser(username);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }
    const data = await request.json();
    const video_id = parseInt(route.params.id, 10);

    const fieldsToUpdate = {};

    if (data.title) fieldsToUpdate.title = data.title;
    if (data.video_url) fieldsToUpdate.video_url = data.video_url;
    if (data.video_img_url) fieldsToUpdate.video_img_url = data.video_img_url;
    if (data.video_desc) fieldsToUpdate.video_desc = data.video_desc;
    if (data.views !== undefined) {
      const viewsInt = parseInt(data.views, 10);
      if (isNaN(viewsInt)) throw new Error("Invalid views value, must be an integer");
      fieldsToUpdate.views = viewsInt;
    }
    if (data.tags) fieldsToUpdate.tags = data.tags;
    if (data.likes !== undefined) {
      const likesInt = parseInt(data.likes, 10);
      if (isNaN(likesInt)) throw new Error("Invalid likes value, must be an integer");
      fieldsToUpdate.likes = likesInt;
    }
    if (data.dislikes !== undefined) {
      const dislikesInt = parseInt(data.dislikes, 10);
      if (isNaN(dislikesInt)) throw new Error("Invalid dislikes value, must be an integer");
      fieldsToUpdate.dislikes = dislikesInt;
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      return new Response(JSON.stringify({ message: "No valid fields to update" }), { status: 400 });
    }

    const updatedVideo = await auth.updateVideo(video_id, fieldsToUpdate);

    return new Response(JSON.stringify(updatedVideo), { status: 200 });

  } catch (err) {
    console.error("Error updating video", err);
    return new Response(
      JSON.stringify({ error: "Error updating video" }),
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
    const user = await auth.getUser(username);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    const video_id = parseInt(route.params.id, 10);
    if (isNaN(video_id)) {
      return new Response(JSON.stringify({ message: "Invalid video ID" }), { status: 400 });
    }

    const result = await deleteVideo(video_id, user.id);

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ message: "Video not found or not owned by user" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Video deleted successfully" }), { status: 200 });

  } catch (err) {
    console.error("Error deleting video", err);
    return new Response(
      JSON.stringify({ error: "Error deleting video" }),
      { status: 500 }
    );
  }
}
