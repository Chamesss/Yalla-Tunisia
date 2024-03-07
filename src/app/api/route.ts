export async function GET(request: Request) {
  console.log(request)
  console.log("Api handmade");
  return Response.json({ data: "hello world" });
}
