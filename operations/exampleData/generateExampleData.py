import datetime
import random
from faker import Faker
import requests
from dateutil.relativedelta import relativedelta

PROJECT_QUANTITY = 30

user_ids = ['bc3bff48-e956-4da2-b916-87de9c851017', 'd435e3d4-9516-49a0-aeb8-a066507ea51d', '423ee4e0-1002-4b8c-8dd4-8bf950a0e67d', 'ea6d075d-4f21-4d15-9da4-7f901e59ada7', '1810e48d-539e-4e9b-9524-2da12f833728', '8b6911ef-5e77-4da1-9e80-87b9d69ec622', 'c3fef2d3-9250-4751-9ad4-dd112556e818', 'a4e5bb22-11c3-411c-bd92-665e7ef47629']
status = ['Entwurf', 'Eingereicht', 'In Prüfung', 'Angenommen', 'Abgelehnt']
departments = ['Human Ressources', 'Financial Accountin', 'Operation', 'Research & Development', 'Management', 'Information Technology']
locations = ['Lörrach', 'Freiburg', 'Breisach', 'Offenburg']

fake = Faker()

projects = []

for i in range(PROJECT_QUANTITY):
  start_date = fake.date_between(datetime.datetime.strptime('11-06-2024', '%d-%m-%Y'), datetime.datetime.strptime('31-12-2024', '%d-%m-%Y'))
  end_date = fake.date_between(datetime.datetime.strptime('01-01-2025', '%d-%m-%Y'), datetime.datetime.strptime('31-12-2026', '%d-%m-%Y'))

  current_date = start_date.replace(day=1)
  months = []

  while current_date <= end_date:
    months.append(current_date.strftime('%d-%m-%Y'))
    current_date += relativedelta(months=1)

  budgets = []
  for month in months:
    budgets.append(
      {
        'title': month,
        'value': random.randint(100, 10000),
        'date': month,
        'type': 'budget_ressource'
      }
    )

  print(budgets)

  project = {
    'status': random.choice(status),
    'title': fake.catch_phrase(),
    'created_from': random.choice(user_ids),
    'start_date': start_date,
    'end_date': end_date,
    'project_lead_id': random.choice(user_ids),
    'sub_project_lead_id': random.choice(user_ids),
    'department': random.choice(departments),
    'location': random.choices(locations, [0.3, 0.5, 0.1, 0.1])[0],
    'auftraggeber_id': random.choice(user_ids),
    'fte_intern': random.randint(1, 100),
    'fte_extern': random.randint(1, 100),
    'investment': random.randint(10, 1000),
    'stakeholder': f'Stakeholder Name: {fake.name()} Job Title: {fake.job()} Stakeholder Opinion: {fake.text()}',
    'customer': random.choice([None, fake.name()]),
    'dependencies': fake.text(),
    'expected_effects': fake.text(),
    'short_description': fake.text(),
    'target_description': fake.text(),
    'vision_description': fake.text(),
    'problem_description': fake.text(),
    'team': random.choices(user_ids, k=3),
    'ressources': [],
    'budget': [],
    'complexity': [],
    'links': []
  }

  projects.append(project)

for project in projects:
  # response = requests.post(url='http://localhost:3000/api/project', data=project)
  response = requests.post(url='https://wi-fallstudie.vercel.app/api/project', data=project)
  print('Success:', response.text)

