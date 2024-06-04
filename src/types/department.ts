export const departments: Department[] = [
  {
    name: 'Human Ressources',
    abbrevation: 'HR'
  }, {
    name: 'Financial Accountin',
    abbrevation: 'FI'
  }, {
    name: 'Operation',
    abbrevation: 'OP'
  }, {
    name: 'Research & Development',
    abbrevation: 'R&D'
  }, {
    name: 'Management',
    abbrevation: 'MGT'
  }, {
    name: 'Information Technology',
    abbrevation: 'IT'
  }
]

type Department = {
  name: string
  abbrevation: string
}