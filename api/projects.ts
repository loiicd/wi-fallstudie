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
    const result = await sql`SELECT * FROM "project"`
    return response.status(200).send(JSON.stringify(result.rows))
  } catch (error) {
    console.error(error)
    return response.status(500).send('Internal Server Error')
  }
}

export default handler