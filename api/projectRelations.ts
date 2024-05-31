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
        case 'CREATE':
            return await createProject_Project_Relation_Table(request, response)
    }
}

async function handlePost(request: VercelRequest, response: VercelResponse) {
    const relation = request.body as ProjectProjectRelation
    if (relation.id?.length !== undefined) {
        return response.status(400).send("UPDATE IS TODO")
    } else {
        const relation_id = uuidv4()
        try {
            await sql`
            INSERT INTO project_project_relation ( 
                id, project_1_id, project_2_id, relation_name_1_to_2, relation_name_2_to_1, created_at, created_from
            ) 
            VALUES (
                ${relation.id}, ${relation.project_1?.id}, ${relation.project_2?.id}, ${relation.relation_name_1_to_2}, ${relation.relation_name_2_to_1}, ${relation.created_from?.id}
            )`
            return response.status(201).send('Created')
        } catch (error) {
            console.error(error)
            return response.status(500).send('Internal Server Error')
        }
    }
}

async function createProject_Project_Relation_Table(request: VercelRequest, response: VercelResponse) {
    try {
        await sql`
        CREATE TABLE project_project_relation (
            id text not null,
            project_1_id text not null,
            project_2_id text not null,
            relation_name_1_to_2 text not null,
            relation_name_2_to_1 text not null,
            created_at date,
            created_from text NOT NULL,
            Foreign Key (project_1_id) references project(id),
            Foreign Key (project_2_id) references project(id),
            FOREIGN KEY (created_from) REFERENCES "user" (id))`
        return response.status(201).send('Created')
    } catch (error) {
        console.log('error')
        console.error(error)
        return response.status(500).send('Internal Server Error')
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

async function handleGet(request: VercelRequest, response: VercelResponse) {
    const project_id = request.query.project_id as string
    try {
        const result = await sql`SELECT * FROM project_project_relation where project_1_id = ${project_id}`
        const result2 = await sql`SELECT * FROM project_project_relation where project_2_id = ${project_id}`

        for (const data of result.rows) {
            data.related_project = (await sql`SELECT * FROM project WHERE id = ${data.project_2_id}`).rows[0]
            data.relation_name = (await sql`SELECT project_1_role_name From project_project_relation_type WHERE id = ${data.project_project_relation_type_id}`).rows[0].project_1_role_name
        }

        for (const data of result2.rows) {
            data.related_project = (await sql`SELECT * FROM project WHERE id = ${data.project_1_id}`).rows[0]
            data.relation_name = (await sql`SELECT project_2_role_name From project_project_relation_type WHERE id = ${data.project_project_relation_type_id}`).rows[0].project_2_role_name
        }

        const merged_results = result.rows.concat(result2.rows)

        return response.status(200).send(merged_results)
    } catch (error) {
        console.error(error)
        return response.status(500).send('Internal Server Error')
    }
}

export default handler