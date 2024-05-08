import { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'
import { v4 as uuidv4 } from 'uuid'

const handler = async (request: VercelRequest, response: VercelResponse) => {
  switch (request.method) {
    case 'POST':
      return await handlePost(request, response)
  }
}

const handlePost = async (request: VercelRequest, response: VercelResponse) => {
  const projectFormData = request.body
  try {
    await sql`INSERT INTO project (id, status, title, start_date, end_date, project_lead_id, sub_project_lead_id, short_description, target_description, vision_description, problem_description) VALUES (${uuidv4()}, ${projectFormData.status}, ${projectFormData.title}, ${projectFormData.startDate}, ${projectFormData.endDate}, ${projectFormData.projectLeadId}, ${projectFormData.subProjectLeadId}, ${projectFormData.shortDescription}, ${projectFormData.targetDescription}, ${projectFormData.visionDescription}, ${projectFormData.problemDescription})`
    return response.status(201).send('Created')
  } catch (error) {
    console.error(error)
    return response.status(500).send('Internal Server Error')
  }
}

export default handler