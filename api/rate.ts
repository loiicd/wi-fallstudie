import { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'

const handler = async (request: VercelRequest, response: VercelResponse) => {
  switch (request.method) {
    case 'POST':
      return await handlePost(request, response)
  }
}

const handlePost = async (request: VercelRequest, response: VercelResponse) => {
  const rate = request.body
  try {
    const rateExists = (await sql`SELECT * FROM project_rate WHERE project_id = ${rate.project_id} AND user_id = ${rate.user_id} AND section = ${rate.section}`).rows[0]
    if (rateExists) {
      await sql`UPDATE project_rate SET rate = ${rate.rate} WHERE project_id = ${rate.project_id} AND user_id = ${rate.user_id} AND section = ${rate.section}`
    } else {
      await sql`INSERT INTO project_rate (project_id, user_id, rate, section) VALUES (${rate.project_id}, ${rate.user_id}, ${rate.rate}, ${rate.section})`
    }
    return response.status(201).send('Created')
  } catch (error) {
    console.error(error)
    return response.status(500).send('Internal Server Error')
  }
}

export default handler