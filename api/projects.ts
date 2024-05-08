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
    const result = await sql`
      SELECT id, status, title, start_date, end_date, project_lead_id, sub_project_lead_id, short_description, target_description, vision_description, problem_description
      FROM "project"`
    
    for (const data of result.rows) {
      const team = await sql`
        SELECT id, firstname, lastname, title
        FROM "user"
        LEFT JOIN project_user_rel ON "user".id = user_id
        WHERE project_id = ${data.id}`
      
      data.team = team.rows
    }
    return response.status(200).send(JSON.stringify(result.rows))
  } catch (error) {
    console.error(error)
    return response.status(500).send('Internal Server Error')
  }
}

export default handler