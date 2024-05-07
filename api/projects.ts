export function GET(request: Request) {
  return new Response(JSON.stringify(projects))
}

export function POST(request: Request) {
  return new Response('POST request received')
}

const projects = [{
  "id": "1",
  "status": "Eingereicht",
  "title": "Projekt Alpha 2",
  "startDate": new Date(),
  "endDate": new Date(),
  "projectLead": {"id": "1", "firstname": "Anna", "lastname": "Schmidt", "title": "Projektleiterin"},
  "subProjectLead": {"id": "2", "firstname": "Markus", "lastname": "Weber", "title": "Stellvertretender Projektleiter"},
  "shortDescription": "Entwicklung einer neuen Softwarelösung für die Firma XYZ",
  "targetDescription": "Entwicklung einer benutzerfreundlichen Software",
  "visionDescription": "Eine benutzerfreundliche Software, die die Produktivität steigert",
  "problemDescription": "Die aktuelle Software der Firma XYZ ist veraltet und ineffizient",
  "team": [
    {"id": "3", "firstname": "Max", "lastname": "Mustermann", "title": "Software Entwickler"},
    {"id": "4", "firstname": "Max", "lastname": "Mustermann", "title": "Software Entwickler"},
    {"id": "5", "firstname": "Max", "lastname": "Mustermann", "title": "Software Entwickler"},
    {"id": "6", "firstname": "Max", "lastname": "Mustermann", "title": "Software Entwickler"},
  ]
}]