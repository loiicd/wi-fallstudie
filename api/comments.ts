import { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'
import { v4 as uuidv4 } from 'uuid'

async function handler(request: VercelRequest, response: VercelResponse) {
    switch (request.method) {
        case 'POST':
            return await handlePost(request, response)
        case 'CREATE':
            return await handleCreateTable(request, response)
    }
}

async function handleCreateTable(request: VercelRequest, response: VercelResponse) {
    try {
        await sql`
        CREATE TABLE comment (
            id text PRIMARY KEY,
            project_id text NOT NULL,
            user_id text NOT NULL,
            type text NOT NULL,
            content text NOT NULL,
            created_at date DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (project_id) REFERENCES project(id),
            FOREIGN KEY (user_id) REFERENCES "user"(id)
          )`
        return response.status(201).send('Created')
    } catch (error) {
        console.error(error)
        return response.status(500).send('Internal Server Error')
    }
}

async function handlePost(request: VercelRequest, response: VercelResponse) {
    const comment = request.body
    console.log(comment)
    const comment_id = uuidv4()
    try {
        await sql`
        INSERT INTO comment (id, project_id, user_id, type, content) 
        VALUES (${comment_id}, ${comment.project_id}, ${comment.user_id}, ${comment.type}, ${comment.content})
        `
        return response.status(201).send('Created')
    } catch (error) {
        console.error(error)
        return response.status(500).send('Internal Server Error')
    }
}

export default handler