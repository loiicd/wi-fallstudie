import { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'
import { v4 as uuidv4 } from 'uuid'

const handler = async (request: VercelRequest, response: VercelResponse) => {
  switch (request.method) {
    case 'GET':
      return await handleGet(request, response)
    case 'POST':
      return await handlePost(request, response)
  }
}

const handleGet = async (request: VercelRequest, response: VercelResponse) => {
  const id = request.query.id as string
  try {
    const projects = await sql`SELECT * FROM project WHERE id = ${id} OR created_from = ${id}`
    return response.status(200).send(projects.rows)
  } catch (error) {
    console.error(error)
    return response.status(500).send('Internal Server Error')
  }
}

const handlePost = async (request: VercelRequest, response: VercelResponse) => {
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

export default handler