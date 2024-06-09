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
      SELECT *
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
      if (data.auftraggeber_id) {
        data.auftraggeber = (await sql`SELECT * FROM "user" WHERE id = ${data.auftraggeber_id}`).rows[0]
      }
      data.rates = (await sql`SELECT * FROM project_rate WHERE project_id = ${data.id}`).rows

      await Promise.all(data.rates.map(async (item: any) =>
        item.user = (await sql`SELECT * FROM "user" WHERE id = ${item.user_id}`).rows[0]
      ))

      data.created_from_user = (await sql`SELECT * FROM "user" WHERE id = ${data.created_from}`).rows[0]

      const ressources = (await sql`SELECT * FROM project_ressource_rel WHERE project_id = ${data.id}`).rows
      data.ressources = ressources.filter((ressource: any) => ressource.type === 'ressource_ressource').sort((a: any, b: any) => a.date - b.date)
      data.budget = ressources.filter((ressource: any) => ressource.type === 'budget_ressource').sort((a: any, b: any) => a.date - b.date)
      data.complexity = ressources.filter((ressource: any) => ressource.type === 'complexity_ressource').sort((a: any, b: any) => a.date - b.date)

    }
    return response.status(200).send(JSON.stringify(result.rows))
  } catch (error) {
    console.error(error)
    return response.status(500).send('Internal Server Error')
  }
}

export default handler