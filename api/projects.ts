export function GET(request: Request) {
  return new Response(JSON.stringify(projects))
}

export function POST(request: Request) {
  return new Response('POST request received')
}

const projects = [{
  "id": "1",
  "name": "Projekt Alpha 2",
  "auftraggeber": "Herr Müller",
  "kunde": "Firma XYZ",
  "problemstellung": "Entwicklung einer neuen Softwarelösung",
  "vision": "Eine benutzerfreundliche Software, die die Produktivität steigert",
  "projektLeiter": "Anna Schmidt",
  "subProjektLeiter": "Markus Weber",
  "startDatum": "2016-01-01",
  "endDatum": "2016-12-31",
  "projektTeam": [
    {
      "id": 2,
      "vorname": "Max",
      "nachname": "Mustermann",
      "rolle": "Entwickler"
    },
    {
      "id": 3,
      "vorname": "Erika",
      "nachname": "Musterfrau",
      "rolle": "Entwickler"
    },
    {
      "id": 4,
      "vorname": "Hans",
      "nachname": "Muster",
      "rolle": "Entwickler"
    }
  ]
},
{
  "id": "2",
  "name": "Projekt Beta",
  "auftraggeber": "Frau Schmidt",
  "kunde": "Unternehmen ABC",
  "problemstellung": "Optimierung der Logistikprozesse",
  "vision": "Eine effizientere und kostengünstigere Lieferkette",
  "projektLeiter": "Julia Mayer",
  "subProjektLeiter": "Michael Schulz",
  "startDatum": "2017-03-15",
  "endDatum": "2017-12-31",
  "projektTeam": [
    {
      "id": 5,
      "vorname": "Sophie",
      "nachname": "Schulze",
      "rolle": "Logistikexperte"
    },
    {
      "id": 6,
      "vorname": "Tobias",
      "nachname": "Schneider",
      "rolle": "Datenanalyst"
    }
  ]
},
{
  "id": "3",
  "name": "Projekt Gamma",
  "auftraggeber": "Herr Mayer",
  "kunde": "Firma ABC GmbH",
  "problemstellung": "Einführung eines neuen CRM-Systems",
  "vision": "Verbesserung der Kundenbeziehungen und Umsatzsteigerung",
  "projektLeiter": "Stefanie Fischer",
  "subProjektLeiter": "Andreas Müller",
  "startDatum": "2018-05-20",
  "endDatum": "2019-02-28",
  "projektTeam": [
    {
      "id": 7,
      "vorname": "Laura",
      "nachname": "Lange",
      "rolle": "CRM-Spezialist"
    },
    {
      "id": 8,
      "vorname": "Martin",
      "nachname": "Meyer",
      "rolle": "Softwareentwickler"
    }
  ]
},
{
  "id": "4",
  "name": "Projekt Delta",
  "auftraggeber": "Frau Weber",
  "kunde": "Unternehmen XYZ",
  "problemstellung": "Entwicklung einer E-Commerce-Plattform",
  "vision": "Schaffung einer benutzerfreundlichen Plattform für den Online-Handel",
  "projektLeiter": "Andreas Fischer",
  "subProjektLeiter": "Tanja Wagner",
  "startDatum": "2019-09-10",
  "endDatum": "2020-06-30",
  "projektTeam": [
    {
      "id": 9,
      "vorname": "Jan",
      "nachname": "Jansen",
      "rolle": "Frontend-Entwickler"
    },
    {
      "id": 10,
      "vorname": "Lisa",
      "nachname": "Lehmann",
      "rolle": "Backend-Entwickler"
    }
  ]
},
{
  "id": "5",
  "name": "Projekt Epsilon",
  "auftraggeber": "Herr Schneider",
  "kunde": "Firma DEF",
  "problemstellung": "Implementierung eines neuen ERP-Systems",
  "vision": "Steigerung der Effizienz in der Unternehmensverwaltung",
  "projektLeiter": "Andrea Wagner",
  "subProjektLeiter": "Maximilian Huber",
  "startDatum": "2020-02-15",
  "endDatum": "2020-11-30",
  "projektTeam": [
    {
      "id": 11,
      "vorname": "Nina",
      "nachname": "Neumann",
      "rolle": "ERP-Consultant"
    },
    {
      "id": 12,
      "vorname": "Tim",
      "nachname": "Thaler",
      "rolle": "Systemadministrator"
    }
  ]
},
{
  "id": "6",
  "name": "Projekt Zeta",
  "auftraggeber": "Frau Fischer",
  "kunde": "Unternehmen GHI",
  "problemstellung": "Entwicklung einer mobilen Anwendung",
  "vision": "Verbesserung der Kundenbindung durch eine mobile Plattform",
  "projektLeiter": "Michaela Vogt",
  "subProjektLeiter": "Stefan Richter",
  "startDatum": "2021-01-20",
  "endDatum": "2021-09-30",
  "projektTeam": [
    {
      "id": 13,
      "vorname": "Hannah",
      "nachname": "Huber",
      "rolle": "App-Entwickler"
    },
    {
      "id": 14,
      "vorname": "Paul",
      "nachname": "Peters",
      "rolle": "UI/UX-Designer"
    }
  ]
}
,
  {
    "id": "7",
    "name": "Projekt Eta",
    "auftraggeber": "Herr Müller",
    "kunde": "Firma XYZ",
    "problemstellung": "Entwicklung einer neuen Softwarelösung",
    "vision": "Eine benutzerfreundliche Software, die die Produktivität steigert",
    "projektLeiter": "Anna Schmidt",
    "subProjektLeiter": "Markus Weber",
    "startDatum": "2022-01-01",
    "endDatum": "2022-12-31",
    "projektTeam": [
      {
        "id": 15,
        "vorname": "Max",
        "nachname": "Mustermann",
        "rolle": "Entwickler"
      },
      {
        "id": 16,
        "vorname": "Erika",
        "nachname": "Musterfrau",
        "rolle": "Entwickler"
      },
      {
        "id": 17,
        "vorname": "Hans",
        "nachname": "Muster",
        "rolle": "Entwickler"
      }
    ]
  },
  {
    "id": "8",
    "name": "Projekt Theta",
    "auftraggeber": "Frau Schmidt",
    "kunde": "Unternehmen ABC",
    "problemstellung": "Optimierung der Logistikprozesse",
    "vision": "Eine effizientere und kostengünstigere Lieferkette",
    "projektLeiter": "Julia Mayer",
    "subProjektLeiter": "Michael Schulz",
    "startDatum": "2022-03-15",
    "endDatum": "2022-12-31",
    "projektTeam": [
      {
        "id": 18,
        "vorname": "Sophie",
        "nachname": "Schulze",
        "rolle": "Logistikexperte"
      },
      {
        "id": 19,
        "vorname": "Tobias",
        "nachname": "Schneider",
        "rolle": "Datenanalyst"
      }
    ]
  },
  {
    "id": "9",
    "name": "Projekt Iota",
    "auftraggeber": "Herr Mayer",
    "kunde": "Firma ABC GmbH",
    "problemstellung": "Einführung eines neuen CRM-Systems",
    "vision": "Verbesserung der Kundenbeziehungen und Umsatzsteigerung",
    "projektLeiter": "Stefanie Fischer",
    "subProjektLeiter": "Andreas Müller",
    "startDatum": "2022-05-20",
    "endDatum": "2022-02-28",
    "projektTeam": [
      {
        "id": 20,
        "vorname": "Laura",
        "nachname": "Lange",
        "rolle": "CRM-Spezialist"
      },
      {
        "id": 21,
        "vorname": "Martin",
        "nachname": "Meyer",
        "rolle": "Softwareentwickler"
      }
    ]
  },
  {
    "id": "10",
    "name": "Projekt Kappa",
    "auftraggeber": "Frau Weber",
    "kunde": "Unternehmen XYZ",
    "problemstellung": "Entwicklung einer E-Commerce-Plattform",
    "vision": "Schaffung einer benutzerfreundlichen Plattform für den Online-Handel",
    "projektLeiter": "Andreas Fischer",
    "subProjektLeiter": "Tanja Wagner",
    "startDatum": "2022-09-10",
    "endDatum": "2023-06-30",
    "projektTeam": [
      {
        "id": 22,
        "vorname": "Jan",
        "nachname": "Jansen",
        "rolle": "Frontend-Entwickler"
      },
      {
        "id": 23,
        "vorname": "Lisa",
        "nachname": "Lehmann",
        "rolle": "Backend-Entwickler"
      }
    ]
  },
  {
    "id": "11",
    "name": "Projekt Lambda",
    "auftraggeber": "Herr Schneider",
    "kunde": "Firma DEF",
    "problemstellung": "Implementierung eines neuen ERP-Systems",
    "vision": "Steigerung der Effizienz in der Unternehmensverwaltung",
    "projektLeiter": "Andrea Wagner",
    "subProjektLeiter": "Maximilian Huber",
    "startDatum": "2023-02-15",
    "endDatum": "2023-11-30",
    "projektTeam": [
      {
        "id": 24,
        "vorname": "Nina",
        "nachname": "Neumann",
        "rolle": "ERP-Consultant"
      },
      {
        "id": 25,
        "vorname": "Tim",
        "nachname": "Thaler",
        "rolle": "Systemadministrator"
      }
    ]
  },
  {
    "id": "12",
    "name": "Projekt Mu",
    "auftraggeber": "Frau Fischer",
    "kunde": "Unternehmen GHI",
    "problemstellung": "Entwicklung einer mobilen Anwendung",
    "vision": "Verbesserung der Kundenbindung durch eine mobile Plattform",
    "projektLeiter": "Michaela Vogt",
    "subProjektLeiter": "Stefan Richter",
    "startDatum": "2023-01-20",
    "endDatum": "2023-09-30",
    "projektTeam": [
      {
        "id": 26,
        "vorname": "Hannah",
        "nachname": "Huber",
        "rolle": "App-Entwickler"
      },
      {
        "id": 27,
        "vorname": "Paul",
        "nachname": "Peters",
        "rolle": "UI/UX-Designer"
      }
    ]
  },
  {
    "id": "13",
    "name": "Projekt Nu",
    "auftraggeber": "Herr Müller",
    "kunde": "Firma XYZ",
    "problemstellung": "Entwicklung einer neuen Softwarelösung",
    "vision": "Eine benutzerfreundliche Software, die die Produktivität steigert",
    "projektLeiter": "Anna Schmidt",
    "subProjektLeiter": "Markus Weber",
    "startDatum": "2024-01-01",
    "endDatum": "2024-12-31",
    "projektTeam": [
      {
        "id": 28,
        "vorname": "Max",
        "nachname": "Mustermann",
        "rolle": "Entwickler"
      },
      {
        "id": 29,
        "vorname": "Erika",
        "nachname": "Musterfrau",
        "rolle": "Entwickler"
      },
      {
        "id": 30,
        "vorname": "Hans",
        "nachname": "Muster",
        "rolle": "Entwickler"
      }
    ]
  },
  {
    "id": "14",
    "name": "Projekt Xi",
    "auftraggeber": "Frau Schmidt",
    "kunde": "Unternehmen ABC",
    "problemstellung": "Optimierung der Logistikprozesse",
    "vision": "Eine effizientere und kostengünstigere Lieferkette",
    "projektLeiter": "Julia Mayer",
    "subProjektLeiter": "Michael Schulz",
    "startDatum": "2024-03-15",
    "endDatum": "2024-12-31",
    "projektTeam": [
      {
        "id": 31,
        "vorname": "Sophie",
        "nachname": "Schulze",
        "rolle": "Logistikexperte"
      },
      {
        "id": 32,
        "vorname": "Tobias",
        "nachname": "Schneider",
        "rolle": "Datenanalyst"
      }
    ]
  },
  {
    "id": "15",
    "name": "Projekt Omikron",
    "auftraggeber": "Herr Mayer",
    "kunde": "Firma ABC GmbH",
    "problemstellung": "Einführung eines neuen CRM-Systems",
    "vision": "Verbesserung der Kundenbeziehungen und Umsatzsteigerung",
    "projektLeiter": "Stefanie Fischer",
    "subProjektLeiter": "Andreas Müller",
    "startDatum": "2024-05-20",
    "endDatum": "2024-02-28",
    "projektTeam": [
      {
        "id": 33,
        "vorname": "Laura",
        "nachname": "Lange",
        "rolle": "CRM-Spezialist"
      },
      {
        "id": 34,
        "vorname": "Martin",
        "nachname": "Meyer",
        "rolle": "Softwareentwickler"
      }
    ]
  },
  {
    "id": "16",
    "name": "Projekt Pi",
    "auftraggeber": "Frau Weber",
    "kunde": "Unternehmen XYZ",
    "problemstellung": "Entwicklung einer E-Commerce-Plattform",
    "vision": "Schaffung einer benutzerfreundlichen Plattform für den Online-Handel",
    "projektLeiter": "Andreas Fischer",
    "subProjektLeiter": "Tanja Wagner",
    "startDatum": "2024-09-10",
    "endDatum": "2025-06-30",
    "projektTeam": [
      {
        "id": 35,
        "vorname": "Jan",
        "nachname": "Jansen",
        "rolle": "Frontend-Entwickler"
      },
      {
        "id": 36,
        "vorname": "Lisa",
        "nachname": "Lehmann",
        "rolle": "Backend-Entwickler"
      }
    ]
  },
  {
    "id": "17",
    "name": "Projekt Rho",
    "auftraggeber": "Herr Schneider",
    "kunde": "Firma DEF",
    "problemstellung": "Implementierung eines neuen ERP-Systems",
    "vision": "Steigerung der Effizienz in der Unternehmensverwaltung",
    "projektLeiter": "Andrea Wagner",
    "subProjektLeiter": "Maximilian Huber",
    "startDatum": "2025-02-15",
    "endDatum": "2025-11-30",
    "projektTeam": [
      {
        "id": 37,
        "vorname": "Nina",
        "nachname": "Neumann",
        "rolle": "ERP-Consultant"
      },
      {
        "id": 38,
        "vorname": "Tim",
        "nachname": "Thaler",
        "rolle": "Systemadministrator"
      }
    ]
  },
  {
    "id": "18",
    "name": "Projekt Sigma",
    "auftraggeber": "Frau Fischer",
    "kunde": "Unternehmen GHI",
    "problemstellung": "Entwicklung einer mobilen Anwendung",
    "vision": "Verbesserung der Kundenbindung durch eine mobile Plattform",
    "projektLeiter": "Michaela Vogt",
    "subProjektLeiter": "Stefan Richter",
    "startDatum": "2025-01-20",
    "endDatum": "2025-09-30",
    "projektTeam": [
      {
        "id": 39,
        "vorname": "Hannah",
        "nachname": "Huber",
        "rolle": "App-Entwickler"
      },
      {
        "id": 40,
        "vorname": "Paul",
        "nachname": "Peters",
        "rolle": "UI/UX-Designer"
      }
    ]
  },
  {
    "id": "19",
    "name": "Projekt Tau",
    "auftraggeber": "Herr Müller",
    "kunde": "Firma XYZ",
    "problemstellung": "Entwicklung einer neuen Softwarelösung",
    "vision": "Eine benutzerfreundliche Software, die die Produktivität steigert",
    "projektLeiter": "Anna Schmidt",
    "subProjektLeiter": "Markus Weber",
    "startDatum": "2026-01-01",
    "endDatum": "2026-12-31",
    "projektTeam": [
      {
        "id": 41,
        "vorname": "Max",
        "nachname": "Mustermann",
        "rolle": "Entwickler"
      },
      {
        "id": 42,
        "vorname": "Erika",
        "nachname": "Musterfrau",
        "rolle": "Entwickler"
      },
      {
        "id": 43,
        "vorname": "Hans",
        "nachname": "Muster",
        "rolle": "Entwickler"
      }
    ]
  },
  {
    "id": "20",
    "name": "Projekt Upsilon",
    "auftraggeber": "Frau Schmidt",
    "kunde": "Unternehmen ABC",
    "problemstellung": "Optimierung der Logistikprozesse",
    "vision": "Eine effizientere und kostengünstigere Lieferkette",
    "projektLeiter": "Julia Mayer",
    "subProjektLeiter": "Michael Schulz",
    "startDatum": "2026-03-15",
    "endDatum": "2026-12-31",
    "projektTeam": [
      {
        "id": 44,
        "vorname": "Sophie",
        "nachname": "Schulze",
        "rolle": "Logistikexperte"
      },
      {
        "id": 45,
        "vorname": "Tobias",
        "nachname": "Schneider",
        "rolle": "Datenanalyst"
      }
    ]
  }
]