import { VercelRequest, VercelResponse } from '@vercel/node'
import { QueryResultRow, sql } from '@vercel/postgres'
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
    const result = await sql`SELECT * FROM project WHERE id = ${id} OR created_from = ${id} or project_lead_id = ${id} or sub_project_lead_id = ${id} ORDER BY created_at DESC`

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

      const comments_records = (await sql`SELECT * FROM comment WHERE project_id = ${data.id} ORDER BY created_at DESC`).rows.sort((a: any, b: any) => a.created_at - b.created_at)
      
      data.links = comments_records
        .filter((comment: any) => comment.type.startsWith('link'))
        .map((comment: any) => ({ id: comment.id, url: comment.content, type: comment.type.replace('link_', '')}))

      data.comments = comments_records.filter((comment: any) => comment.type === 'comment')
      await Promise.all(data.comments.map(async (item: any) =>
        item.user = (await sql`SELECT * FROM "user" WHERE id = ${item.user_id}`).rows[0]
      ))

      const ressources = (await sql`SELECT * FROM project_ressource_rel WHERE project_id = ${data.id}`).rows
      data.ressources = ressources.filter((ressource: any) => ressource.type === 'ressource_ressource').sort((a: any, b: any) => a.date - b.date)
      data.budget = ressources.filter((ressource: any) => ressource.type === 'budget_ressource').sort((a: any, b: any) => a.date - b.date)
      data.complexity = ressources.filter((ressource: any) => ressource.type === 'complexity_ressource').sort((a: any, b: any) => a.date - b.date)

      const related_projects_1 = (await 
        sql`
          SELECT id, project_1_id as project_id, relation_name_2_to_1 as role, created_at, created_from as created_from_id
          FROM project_project_relation 
          WHERE project_2_id = ${data.id}
        `).rows
      const related_projects_2 = (await 
        sql`
          SELECT id, project_2_id as project_id, relation_name_1_to_2 as role, created_at, created_from as created_from_id
          FROM project_project_relation 
          WHERE project_1_id = ${data.id}
        `).rows

      data.related_projects = [...related_projects_1, ...related_projects_2]
      await Promise.all(data.related_projects.map(async (item: any) =>
        item.project = (await sql`SELECT * FROM project WHERE id = ${item.project_id}`).rows[0]
      ))
      await Promise.all(data.related_projects.map(async (item: any) =>
        item.created_from = (await sql`SELECT * FROM "user" WHERE id = ${item.created_from}`).rows[0]
      ))

      data.created_from_user = (await sql`SELECT * FROM "user" WHERE id = ${data.created_from}`).rows[0]
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
      await sql`UPDATE project SET status = ${project.status}, title = ${project.title}, prio = ${project.prio}, start_date = ${project.start_date}, end_date = ${project.end_date}, project_lead_id = ${project.project_lead_id}, sub_project_lead_id = ${project.sub_project_lead_id}, auftraggeber_id = ${project.auftraggeber_id} fte_intern = ${project.fte_intern}, fte_extern = ${project.fte_extern}, investment = ${project.investment}, stakeholder = ${project.stakeholder}, customer = ${project.customer}, dependencies = ${project.dependencies}, expected_effects = ${project.expected_effects}, short_description = ${project.short_description}, target_description = ${project.target_description}, vision_description = ${project.vision_description}, problem_description = ${project.problem_description}, department= ${project.department}, location= ${project.location} WHERE id = ${project.id}`

      const currentTeamMembers = await sql`SELECT user_id FROM project_user_rel WHERE project_id = ${project.id}`
      const currentTeamMemberSet = new Set(currentTeamMembers.rows.map((member: QueryResultRow) => member.user_id))
      const newTeamMemberSet = new Set(project.team.map((member: { id: string }) => member.id))
      const membersToAdd = [...newTeamMemberSet].filter((member: any) => !currentTeamMemberSet.has(member))
      const membersToRemove = [...currentTeamMemberSet].filter(member => !newTeamMemberSet.has(member))
      for (const memberId of membersToAdd) {
        if (typeof memberId === 'string') {await sql`INSERT INTO project_user_rel (project_id, user_id, role) VALUES (${project.id}, ${memberId}, ${null})`}
      }
      for (const memberId of membersToRemove) {
        await sql`DELETE FROM project_user_rel WHERE project_id = ${project.id} AND user_id = ${memberId}`
      }

      const currentLinks = await sql`SELECT id FROM comment WHERE project_id = ${project.id} AND type LIKE 'link_%'`
      const currentLinkSet = new Set(currentLinks.rows.map((link: QueryResultRow) => link.id))
      const newLinkSet = new Set()
      if (project.links.length >= 0) {
        const linksToAdd = project.links.filter((link: { url: string, type: string }) => link.url !== '' && !currentLinkSet.has(link.url))
        for (const link of linksToAdd) {
          await sql`INSERT INTO comment (id, project_id, user_id, content, type, created_at) VALUES (${uuidv4()}, ${project.id}, ${project.created_from.id ?? project.created_from}, ${link.url}, ${'link_' + link.type}, now())`
        }
      }
      const linksToRemove = [...currentLinkSet].filter(link => !newLinkSet.has(link))
      for (const linkId of linksToRemove) {
        await sql`DELETE FROM comment WHERE project_id = ${project.id} AND id = ${linkId}`
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
      await sql`INSERT INTO project (id, status, title, created_from, created_at, start_date, end_date, project_lead_id, sub_project_lead_id, auftraggeber_id, department, location, fte_intern, fte_extern, investment, stakeholder, customer, dependencies, expected_effects, prio, short_description, target_description, vision_description, problem_description) VALUES (${project_id}, ${projectFormData.status}, ${projectFormData.title}, ${projectFormData.created_from}, now()::timestamp, ${projectFormData.start_date}, ${projectFormData.end_date}, ${projectFormData.project_lead_id}, ${projectFormData.sub_project_lead_id}, ${projectFormData.auftraggeber_id}, ${projectFormData.department}, ${projectFormData.location}, ${projectFormData.fte_intern}, ${projectFormData.fte_extern}, ${projectFormData.investment}, ${projectFormData.stakeholder}, ${projectFormData.customer}, ${projectFormData.dependencies}, ${projectFormData.expected_effects}, ${projectFormData.prio}, ${projectFormData.short_description}, ${projectFormData.target_description}, ${projectFormData.vision_description}, ${projectFormData.problem_description})`
      await Promise.all(projectFormData.team.map(async (userId: string) => {
        await sql`INSERT INTO "project_user_rel" (project_id, user_id, role) VALUES (${project_id}, ${userId}, ${null})`
      }))
      await Promise.all(projectFormData.links?.map(async (link: any) => {
        await sql`INSERT INTO comment (id, project_id, user_id, content, type, created_at) VALUES (${uuidv4()}, ${project_id}, ${projectFormData.created_from}, ${link.url}, ${'link_' + link.type}, now())`
      }))
      return response.status(201).send({message: 'Created', project_id: project_id})
    } catch (error) {
      console.error(error)
      return response.status(500).send('Internal Server Error')
    }
  }
}

const handleDelete = async (request: VercelRequest, response: VercelResponse) => {
  const id = request.body.id as string
  try {
    await sql`DELETE FROM project_project_relation WHERE project_1_id = ${id} OR project_2_id = ${id}`
    await sql`DELETE FROM project_rate WHERE project_id = ${id}`
    await sql`DELETE FROM project_user_rel WHERE project_id = ${id}`
    await sql`DELETE FROM comment WHERE project_id = ${id}`
    await sql`DELETE FROM project_ressource_rel WHERE project_id = ${id}`
    await sql`DELETE FROM project WHERE id = ${id}`
    return response.status(200).send('Deleted')
  } catch (error) {
    console.error(error)
    return response.status(500).send('Internal Server Error')
  }
}

export default handler