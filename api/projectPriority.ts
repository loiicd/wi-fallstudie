import { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'

type Prio = {
  project_id: string,
  prio: number
}

async function handler(request: VercelRequest, response: VercelResponse) {
  console.log('Happen')
  switch (request.method) {
    case 'POST':
      return await handlePost(request, response)
  }
}

const handlePost = async (request: VercelRequest, response: VercelResponse) => {
  const data = request.body as Prio
  console.log(data)
  try {
    await sql`UPDATE project SET prio = ${data.prio} WHERE id = ${data.project_id}`
    return response.status(200).send('Updated')
  } catch (error) {
    return response.status(500).send('Internal Server Error')
  }
}

export default handler