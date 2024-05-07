// export const GET = (reqeuest: Request) => {
//   return new Response(`Hello from ${process.env.VERCEL_REGION}`)
// }

// export function GET(request: Request) {
//   return new Response(`Hello from ${process.env.VERCEL_REGION}`);
// }

export const projects = async () => {
  return new Response(`Hello from ${process.env.VERCEL_REGION}`)
}
