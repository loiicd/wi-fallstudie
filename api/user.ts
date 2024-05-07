import { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'
import { v4 as uuidv4 } from 'uuid'

export const GET = async (request: any, response: VercelResponse) => {
  try {
    const result = await sql`SELECT id, firstname, lastname, title FROM "user"`
    console.log(result)
    return new Response(JSON.stringify(result.rows))
  } catch (error) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500, statusText: 'Internal Server Error'})
  }
}

export const POST = async (request: any, response: VercelResponse) => {
  const firstname = request.body.firstname as string
  const lastname = request.body.lastname as string
  const title = request.body.title as string
  console.log('Body', request.body)
  console.log('Query', request.query)
  console.log(request)
  try {
    await sql`INSERT INTO "user" (id, firstname, lastname, title) VALUES (${uuidv4()}, ${firstname}, ${lastname}, ${title})`
    return new Response('Created', { status: 201, statusText: 'Created'})
  } catch (error) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500, statusText: 'Internal Server Error'})
  }
}

export const PUT = async () => {
  return new Response('PUT User')
}

export const DELETE = async () => {
  return new Response('DELETE User')
}