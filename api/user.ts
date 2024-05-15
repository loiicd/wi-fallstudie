import { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'

const handler = async (request: VercelRequest, response: VercelResponse) => {
  switch (request.method) {
    case 'GET':
      return await handleGet(request, response)
  }
}

const handleGet = async (request: VercelRequest, response: VercelResponse) => {
  const userId = request.query.id as string
  try {
    const result = await sql`SELECT id, firstname, lastname, title, type FROM "user" WHERE id = ${userId}`
    return response.send(JSON.stringify(result.rows))
  } catch (error) {
    console.error(error)
    return response.send('Internal Server Error')
  }
}

export default handler