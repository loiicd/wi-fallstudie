import { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'
import { v4 as uuidv4 } from 'uuid'

async function handler(request: VercelRequest, response: VercelResponse) {
    switch (request.method) {
        case 'POST':
            return await handlePost(request, response)
        case 'DELETE':
            return await handleDelete(request, response)
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

async function handleDelete(request: VercelRequest, response: VercelResponse) {
    const comment_id = request.body.id as string
    try {
        await sql`DELETE FROM comment WHERE id = ${comment_id}`
        return response.status(200).send('Deleted')
    } catch (error) {
        console.error(error)
        return response.status(500).send('Internal Server Error')
    }
}

export default handler