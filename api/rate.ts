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
  console.log(rate)
  try {
    const rateExists = (await sql`SELECT * FROM project_rate WHERE project_id = ${rate.project_id} AND user_id = ${rate.user_id}`).rows[0]
    if (rateExists) {
      await sql`UPDATE project_rate SET rate = ${rate.rate} WHERE project_id = ${rate.project_id} AND user_id = ${rate.user_id}`
    } else {
      await sql`INSERT INTO project_rate (project_id, user_id, rate) VALUES (${rate.project_id}, ${rate.user_id}, ${rate.rate})`
    }
    return response.status(201).send('Created')
  } catch (error) {
    console.error(error)
    return response.status(500).send('Internal Server Error')
  }
}

export default handler