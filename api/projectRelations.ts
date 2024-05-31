import { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'
import { v4 as uuidv4 } from 'uuid'
import { ProjectProjectRelation } from '../src/types/projectProjectRelation'

async function handler(request: VercelRequest, response: VercelResponse) {
    switch (request.method) {
        case 'POST':
            return await handlePost(request, response)
        case 'DELETE':
            return await handleDelete(request, response)
    }
}

async function handlePost(request: VercelRequest, response: VercelResponse) {
    const relation = request.body as ProjectProjectRelation
    if (relation.id?.length !== undefined) {
        return response.status(400).send("UPDATE IS TODO")
    } else {
        const relation_id = uuidv4()
        const project_1_id = relation.project_1?.id
        const project_2_id = relation.project_2?.id
        const created_from = relation.created_from?.id
        try {
            await sql`
            INSERT INTO project_project_relation (
                id,
                project_1_id,
                project_2_id,
                relation_name_1_to_2,
                relation_name_2_to_1,
                created_from
            ) 
            VALUES (
                ${relation_id},
                ${project_1_id},
                ${project_2_id},
                ${relation.relation_name_1_to_2},
                ${relation.relation_name_2_to_1},
                ${created_from}
            )`
            return response.status(201).send('Created')
        } catch (error) {
            console.error(error)
            return response.status(500).send('Internal Server Error')
        }
    }
}

async function handleDelete(request: VercelRequest, response: VercelResponse) {
    const project_relation_id = request.body.id as string
    try {
        await sql`DELETE FROM project_project_relation WHERE id = ${project_relation_id}`
        return response.status(200).send('Deleted')
    } catch (error) {
        console.error(error)
        return response.status(500).send('Internal Server Error')
    }
}

export default handler