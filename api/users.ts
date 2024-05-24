import { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'

const handler = async (request: VercelRequest, response: VercelResponse) => {
  switch (request.method) {
    case 'GET':
      return await handleGet(response)
  }
}

const handleGet = async (response: VercelResponse) => {
  try {
    const result = await sql`SELECT * FROM "user"`
    return response.send(JSON.stringify(result.rows))
  } catch (error) {
    console.error(error)
    return response.send('Internal Server Error')
  }
}

export default handler