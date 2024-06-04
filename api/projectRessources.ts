import { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'
import { v4 as uuidv4 } from 'uuid'
import ProjectRessourceGeneric from '../src/types/projectResourceGeneric'

async function handler(request: VercelRequest, response: VercelResponse) {
    switch (request.method) {
        case 'POST':
            return await handlePost(request, response)
        case 'GET': 
            return await handleGet(request, response)
        case 'DELETE':
            return await handleDelete(request, response)
    }
}

async function handleDelete(request: VercelRequest, response: VercelResponse) {
    const ressource_id = request.body.id as string
    try {
        await sql`DELETE FROM project_ressource_rel WHERE id = ${ressource_id}`
        return response.status(200).send('Deleted')
    } catch (error) {
        console.error(error)
        return response.status(500).send('Internal Server Error')
    }
}

async function handleGet(request: VercelRequest, response: VercelResponse) {
    const project_id = request.query.project_id as string
    const type = request.query.type as string
    console.log(project_id, type)
    try {
        const result = await sql`SELECT * FROM project_ressource_rel WHERE project_id = ${project_id} AND type = ${type}`
        return response.status(200).json(result.rows.sort((a, b) => a.date - b.date))
    } catch (error) {
        console.error(error)
        return response.status(500).send('Internal Server Error')
    }
}


async function handlePost(request: VercelRequest, response: VercelResponse) {
    const ressource = request.body as ProjectRessourceGeneric
    if (!ressource.id) {
      const ressource_id = uuidv4()
      try {
          await sql`
          INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) 
          VALUES (${ressource_id}, ${ressource.project_id}, ${ressource.title}, ${ressource.value}, ${ressource.type}, ${ressource.date})
          `
          return response.status(201).send('Created')
      } catch (error) {
          console.error(error)
          return response.status(500).send('Internal Server Error')
      }
    }
}

export default handler

/**

INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) 
VALUES ('test', '13fe94e8-dff6-4a48-83c1-87e440e5d6a4', 'technik', 'viel', 'test Wert', '2024-06-04T10:50:38.443Z')

 */