export const GET = (reqeuest: Request) => {
  return new Response(`Hello from ${process.env.VERCEL_REGION}`)
}