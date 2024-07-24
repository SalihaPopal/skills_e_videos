const auth = require("../auth");

export async function POST(request) {
  const data = await request.json();
  const username = data["username"];
  const password = data["password"];

  if(!auth.Login(username, password)) {
    return Response.json(
      "not authorized, password does not match",
      {status: 403}
    );
  }
  const token = auth.createToken(username);
  return Response.json({ token: token });
}

