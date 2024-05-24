import { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'
import { v4 as uuidv4 } from 'uuid'

const handler = async (request: VercelRequest, response: VercelResponse) => {
  switch (request.method) {
    case 'GET':
      return await handleGet(request, response)
    case 'POST':
      return await handlePost(request, response)
    case 'DELETE':
      return await handleDelete(request, response)
  }
}

const handleGet = async (request: VercelRequest, response: VercelResponse) => {
  const id = request.query.id as string
  try {
    const result = await sql`SELECT * FROM project WHERE id = ${id} OR created_from = ${id}`

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
    }

    return response.status(200).send(result.rows)
  } catch (error) {
    console.error(error)
    return response.status(500).send('Internal Server Error')
  }
}

const handlePost = async (request: VercelRequest, response: VercelResponse) => {
  if (request.body.id) {
    const project = request.body
    try {
      await sql`UPDATE project SET status = ${project.status}, title = ${project.title}, start_date = ${project.start_date}, end_date = ${project.end_date}, project_lead_id = ${project.project_lead_id}, sub_project_lead_id = ${project.sub_project_lead_id}, short_description = ${project.short_description}, target_description = ${project.target_description}, vision_description = ${project.vision_description}, problem_description = ${project.problem_description} WHERE id = ${project.id}`
      for (const teamMember of project.team) {
        await sql`UPDATE project_user_rel SET role = ${teamMember.role} WHERE project_id = ${project.id} AND user_id = ${teamMember.id}`
      }
  
      return response.status(200).send('Updated')
    } catch (error) {
      console.error(error)
      return response.status(500).send('Internal Server Error')
    }
  }
  else {
    const projectFormData = request.body
    const project_id = uuidv4()
    try {
      await sql`INSERT INTO project (id, status, title, created_from, created_at, start_date, end_date, project_lead_id, sub_project_lead_id, short_description, target_description, vision_description, problem_description) VALUES (${project_id}, ${projectFormData.status}, ${projectFormData.title}, ${projectFormData.created_from}, now()::timestamp, ${projectFormData.start_date}, ${projectFormData.end_date}, ${projectFormData.project_lead_id}, ${projectFormData.sub_project_lead_id}, ${projectFormData.short_description}, ${projectFormData.target_description}, ${projectFormData.vision_description}, ${projectFormData.problem_description})`
      await Promise.all(projectFormData.team.map(async (userId: string) => {
        console.log('Executed')
        await sql`INSERT INTO "project_user_rel" (project_id, user_id, role) VALUES (${project_id}, ${userId}, ${null})`
      }))
      return response.status(201).send('Created')
    } catch (error) {
      console.error(error)
      return response.status(500).send('Internal Server Error')
    }
  }
}

const handleDelete = async (request: VercelRequest, response: VercelResponse) => {
  const id = request.body.id as string
  try {
    await sql`DELETE FROM project_user_rel WHERE project_id = ${id}`
    await sql`DELETE FROM project WHERE id = ${id}`
    return response.status(200).send('Deleted')
  } catch (error) {
    console.error(error)
    return response.status(500).send('Internal Server Error')
  }
}

export default handler