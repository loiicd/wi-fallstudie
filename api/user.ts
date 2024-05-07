import { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'
import { v4 as uuidv4 } from 'uuid'

const handler = async (request: VercelRequest, response: VercelResponse) => {
  switch (request.method) {
    case 'GET':
      return await handleGet(response)
    case 'POST':
      return await handlePost(request, response)
    case 'DELETE':
      return await handleDelete(request, response)
  }
}

const handleGet = async (response: VercelResponse) => {
  try {
    const result = await sql`SELECT id, firstname, lastname, title FROM "user"`
    return response.send(JSON.stringify(result.rows))
  } catch (error) {
    console.error(error)
    return response.send('Internal Server Error')
  }
}

const handlePost = async (request: VercelRequest, response: VercelResponse) => {
  const firstname = request.body.firstname as string
  const lastname = request.body.lastname as string
  const title = request.body.title as string
  try {
    await sql`INSERT INTO "user" (id, firstname, lastname, title) VALUES (${uuidv4()}, ${firstname}, ${lastname}, ${title})`
    return response.status(201).send('Created')
  } catch (error) {
    console.error(error)
    return response.status(500).send('Internal Server Error')
  }
}

const handleDelete = async (request: VercelRequest, response: VercelResponse) => {
  const userId = request.body as string
  try {
    await sql`DELETE FROM "user" WHERE id = ${userId}`
    return response.status(201).send('Created')
  } catch (error) {
    console.error(error)
    return response.status(500).send('Internal Server Error')
  }
}

export default handler