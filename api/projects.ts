export function GET(request: Request) {
  const data = [
    { id: 1, name: 'Project 1', description: 'Description 1' },
    { id: 2, name: 'Project 2', description: 'Description 2' },
    { id: 3, name: 'Project 3', description: 'Description 3' },
  ]

  return new Response(JSON.stringify(data))
}