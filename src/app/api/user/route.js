const auth = require("../auth");

export async function GET() {
  console.log(await auth.getUsers());
  return Response.json(await auth.getUsers(), 
  { status: 200 });
}


export async function POST(req){
  try {
    const data = await req.json();
    const addedUser = await auth.AddUser(
      data.username,
      data.password,
      data.email,
    )
  } catch (error) {
    console.log("Something went wrong!", {status: 500});
  }
  return Response.json("User successfully registered", {status: 200});
}


