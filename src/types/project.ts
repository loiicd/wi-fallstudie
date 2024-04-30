export type Projekt = {
  id: string

  name: string
  auftraggeber: string

  kunde: string

  problemstellung: string
  vision: string

  projektLeiter: string
  subProjektLeiter: string

  startDatum: Date
  endDatum: Date

  projektTeam: {
    userId: string
    vorname: string
    nachname: string
    rolle: string
  }[]
}