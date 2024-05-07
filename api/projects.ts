import projects from './projekte.json'

export function GET(request: Request) {
  return new Response(JSON.stringify(projects))
}