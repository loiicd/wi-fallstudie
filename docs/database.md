
# TOC
- [Database](#database)
  - [Database SQL Commands](#database-sql-commands)
  - [Test Data](#test-data)



# Database

## Database SQL Commands
```sql
CREATE TABLE project (
  id text NOT NULL,
  status text NOT NULL,
  title text NOT  NULL,
  created_from text NOT NULL,
  created_at date,
  start_date date,
  end_date date,
  project_lead_id text,
  sub_project_lead_id text,
  department text,
  location text,
  investment integer,
  stakeholder text,
  customer text,
  dependencies text,
  expected_effects text,
  prio integer,
  short_description text,
  target_description text,
  vision_description text,
  problem_description text,
  PRIMARY KEY (id),
  FOREIGN KEY (project_lead_id) REFERENCES "user" (id),
  FOREIGN KEY (sub_project_lead_id) REFERENCES "user" (id),
  FOREIGN KEY (created_from) REFERENCES "user" (id)
)
```

```sql
CREATE TABLE "user" (
  id text NOT NULL,
  firstname text NOT NULL,
  lastname text NOT NULL,
  email text NOT NULL,
  title text,
  type text NOT NULL,
  PRIMARY KEY (id)
)
```

```sql
CREATE TABLE project_user_rel (
  project_id text NOT NULL,
  user_id text NOT NULL,
  role text,
  PRIMARY KEY (project_id, user_id),
  FOREIGN KEY (project_id) REFERENCES project (id),
  FOREIGN KEY (user_id) REFERENCES "user" (id)
)
```

```sql
CREATE TABLE project_rate (
  project_id text NOT NULL,
  user_id text NOT NULL,
  rate integer NOT NULL,
  PRIMARY KEY (project_id, user_id),
  FOREIGN KEY (project_id) REFERENCES project (id),
  FOREIGN KEY (user_id) REFERENCES "user" (id)
)
```

```sql
CREATE TABLE comment (
  id text PRIMARY KEY,
  project_id text NOT NULL,
  user_id text NOT NULL,
  type text NOT NULL,
  content text NOT NULL,
  created_at date DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES project(id),
  FOREIGN KEY (user_id) REFERENCES "user"(id)
)
```

```sql
CREATE TABLE project_project_relation (
  id text not null,
  project_1_id text not null,
  project_2_id text not null,
  relation_name_1_to_2 text not null,
  relation_name_2_to_1 text not null,
  created_at date,
  created_from text NOT NULL,
  Foreign Key (project_1_id) references project(id),
  Foreign Key (project_2_id) references project(id),
  FOREIGN KEY (created_from) REFERENCES "user" (id)
)
```

project_ressource_rel is either "ressource_ressource", "budget_ressource" or "complexity_ressource"
```sql
  CREATE TABLE project_ressource_rel (
    id text NOT NULL,
    project_id text NOT NULL,
    title text NOT NULL,
    value text NOT NULL,
    type text NOT NULL,
    date date,
    PRIMARY KEY (id),
    FOREIGN KEY (project_id) REFERENCES project (id)
  )
```

```sql
INSERT INTO "user" (id, firstname, lastname, email, title, type) VALUES ('bc3bff48-e956-4da2-b916-87de9c851017', 'Simon', 'Bühler', 'buehlsim@dhbw-loerrach.de', null, 'administrator');
INSERT INTO "user" (id, firstname, lastname, email, title, type) VALUES ('d435e3d4-9516-49a0-aeb8-a066507ea51d', 'Moritz', 'Höft', 'hoeftm@dhbw-loerrach.de', null, 'geschäftsleitung');
INSERT INTO "user" (id, firstname, lastname, email, title, type) VALUES ('423ee4e0-1002-4b8c-8dd4-8bf950a0e67d', 'Anna-Lehna', 'Grittke', 'grittkea@dhbw-loerrach.de', null, 'controller');
INSERT INTO "user" (id, firstname, lastname, email, title, type) VALUES ('ea6d075d-4f21-4d15-9da4-7f901e59ada7', 'Jacob', 'Ruhnau', 'ruhnauja@dhbw-loerrach.de', null, 'projektleitung');
INSERT INTO "user" (id, firstname, lastname, email, title, type) VALUES ('1810e48d-539e-4e9b-9524-2da12f833728', 'Chiara', 'Facciola', 'facciolc@dhbw-loerrach.de', null, 'base');
INSERT INTO "user" (id, firstname, lastname, email, title, type) VALUES ('8b6911ef-5e77-4da1-9e80-87b9d69ec622', 'Annika', 'Geppert', 'gepperta@dhbw-loerrach.de', null, 'base');
INSERT INTO "user" (id, firstname, lastname, email, title, type) VALUES ('c3fef2d3-9250-4751-9ad4-dd112556e818', 'Loïc', 'Dörr', 'doerrl@dhbw-loerrach.de', null, 'base');
INSERT INTO "user" (id, firstname, lastname, email, title, type) VALUES ('a4e5bb22-11c3-411c-bd92-665e7ef47629', 'Daniel', 'Riesterer', 'riesterer@example.com', null, 'base');
```


# Test Data
## project 1
```sql
INSERT INTO project (id, status, title, created_from, created_at, start_date, end_date, project_lead_id, sub_project_lead_id, department, location, investment, stakeholder, customer, dependencies, expected_effects, short_description, target_description, vision_description, problem_description) VALUES ('11', 'active', 'Test Project', 'ea6d075d-4f21-4d15-9da4-7f901e59ada7', now()::timestamp, '2024-01-01', '2024-09-01', 'ea6d075d-4f21-4d15-9da4-7f901e59ada7', '1810e48d-539e-4e9b-9524-2da12f833728', 'IT', 'Lörrach', 1000, 'Simon Bühler', 'Moritz Höft', 'None', 'None', 
'Short Description', 'Target Description', 'Vision Description', 'Problem Description');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('1', '11', 'Kosten', '4000', 'budget_ressource', '2024-01-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('2', '11', 'Kosten', '4000', 'budget_ressource', '2024-02-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('3', '11', 'Kosten', '5000', 'budget_ressource', '2024-03-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('4', '11', 'Kosten', '5000', 'budget_ressource', '2024-04-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('5', '11', 'Kosten', '5000', 'budget_ressource', '2024-05-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('6', '11', 'Kosten', '7000', 'budget_ressource', '2024-06-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('7', '11', 'Kosten', '7000', 'budget_ressource', '2024-07-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('8', '11', 'Kosten', '8000', 'budget_ressource', '2024-08-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('9', '11', 'Kosten', '2000', 'budget_ressource', '2024-09-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('10', '11', 'Intern', '4', 'ressource_ressource', '2024-01-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('11', '11', 'Intern', '4', 'ressource_ressource', '2024-02-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('12', '11', 'Intern', '4', 'ressource_ressource', '2024-03-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('13', '11', 'Intern', '4', 'ressource_ressource', '2024-04-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('14', '11', 'Intern', '4', 'ressource_ressource', '2024-05-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('15', '11', 'Intern', '4', 'ressource_ressource', '2024-06-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('16', '11', 'Intern', '4', 'ressource_ressource', '2024-07-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('17', '11', 'Intern', '4', 'ressource_ressource', '2024-08-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('18', '11', 'Intern', '4', 'ressource_ressource', '2024-09-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('19', '11', 'Extern', '2', 'ressource_ressource', '2024-02-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('20', '11', 'Extern', '2', 'ressource_ressource', '2024-03-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('21', '11', 'Extern', '2', 'ressource_ressource', '2024-04-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('22', '11', 'Extern', '2', 'ressource_ressource', '2024-05-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('23', '11', 'Extern', '3', 'ressource_ressource', '2024-06-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('24', '11', 'Extern', '3', 'ressource_ressource', '2024-07-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('25', '11', 'Extern', '3', 'ressource_ressource', '2024-08-01');
INSERT INTO project_ressource_rel (id, project_id, title, value, type, date) VALUES ('26', '11', 'Extern', '1', 'ressource_ressource', '2024-09-01');
insert into project_user_rel (project_id, user_id) values ('11', 'bc3bff48-e956-4da2-b916-87de9c851017');
insert into project_user_rel (project_id, user_id) values ('11', 'd435e3d4-9516-49a0-aeb8-a066507ea51d');
insert into project_user_rel (project_id, user_id) values ('11', '423ee4e0-1002-4b8c-8dd4-8bf950a0e67d');
````
