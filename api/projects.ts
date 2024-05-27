import { VercelRequest, VercelResponse } from '@vercel/node'
import { QueryResultRow, sql } from '@vercel/postgres'

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
        SELECT *
        FROM "user"
        LEFT JOIN project_user_rel ON "user".id = user_id
        WHERE project_id = ${data.id}`
      
      data.team = team.rows
      if (data.project_lead_id) {
        data.project_lead = (await sql`SELECT * FROM "user" WHERE id = ${data.project_lead_id}`).rows[0]
      }
      if (data.sub_project_lead_id) {
        data.sub_project_lead = (await sql`SELECT * FROM "user" WHERE id = ${data.sub_project_lead_id}`).rows[0]
      }
      data.rates = (await sql`SELECT * FROM project_rate WHERE project_id = ${data.id}`).rows

      await Promise.all(data.rates.map(async (item: any) =>
        item.user = (await sql`SELECT * FROM "user" WHERE id = ${item.user_id}`).rows[0]
      ))

      const comments = await sql`
        SELECT *
        FROM comment
        WHERE project_id = ${data.id}
      `
      data.comments = comments.rows
      await Promise.all(data.comments.map(async (item: any) =>
        item.user = (await sql`SELECT * FROM "user" WHERE id = ${item.user_id}`).rows[0]
      ))

    }
    return response.status(200).send(JSON.stringify(result.rows))
  } catch (error) {
    console.error(error)
    return response.status(500).send('Internal Server Error')
  }
}

export default handler