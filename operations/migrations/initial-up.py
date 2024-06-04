from databaseConnection import DatabaseConnection


databaseConnection = DatabaseConnection()

insert_user_table_query = '''
  CREATE TABLE "user" (
    id text NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    email text NOT NULL,
    title text,
    type text NOT NULL,
    PRIMARY KEY (id)
  )
'''

insert_project_table_query = '''
  CREATE TABLE project (
    id text NOT NULL,
    status text NOT NULL,
    title text NOT NULL,
    created_from text NOT NULL,
    created_at date,
    start_date date,
    end_date date,
    project_lead_id text,
    sub_project_lead_id text,
    department text,
    location text,
    fte_intern integer,
    fte_extern integer,
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
'''

insert_project_user_rel_table_query = '''
  CREATE TABLE project_user_rel (
    project_id text NOT NULL,
    user_id text NOT NULL,
    role text,
    PRIMARY KEY (project_id, user_id),
    FOREIGN KEY (project_id) REFERENCES project (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id)
  )
'''

insert_project_rate_table_query = '''
  CREATE TABLE project_rate (
    project_id text NOT NULL,
    user_id text NOT NULL,
    rate integer NOT NULL,
    PRIMARY KEY (project_id, user_id),
    FOREIGN KEY (project_id) REFERENCES project (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id)
  )
'''

insert_comment_table_query = '''
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
'''

insert_project_project_rel_table_query = '''
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
'''

insert_user_data_query = '''
  INSERT INTO "user" (id, firstname, lastname, email, title, type) VALUES ('bc3bff48-e956-4da2-b916-87de9c851017', 'Simon', 'Bühler', 'buehlsim@dhbw-loerrach.de', null, 'administrator');
  INSERT INTO "user" (id, firstname, lastname, email, title, type) VALUES ('d435e3d4-9516-49a0-aeb8-a066507ea51d', 'Moritz', 'Höft', 'hoeftm@dhbw-loerrach.de', null, 'geschäftsleitung');
  INSERT INTO "user" (id, firstname, lastname, email, title, type) VALUES ('423ee4e0-1002-4b8c-8dd4-8bf950a0e67d', 'Anna-Lehna', 'Grittke', 'grittkea@dhbw-loerrach.de', null, 'controller');
  INSERT INTO "user" (id, firstname, lastname, email, title, type) VALUES ('ea6d075d-4f21-4d15-9da4-7f901e59ada7', 'Jacob', 'Ruhnau', 'ruhnauja@dhbw-loerrach.de', null, 'projektleitung');
  INSERT INTO "user" (id, firstname, lastname, email, title, type) VALUES ('1810e48d-539e-4e9b-9524-2da12f833728', 'Chiara', 'Facciola', 'facciolc@dhbw-loerrach.de', null, 'base');
  INSERT INTO "user" (id, firstname, lastname, email, title, type) VALUES ('8b6911ef-5e77-4da1-9e80-87b9d69ec622', 'Annika', 'Geppert', 'gepperta@dhbw-loerrach.de', null, 'base');
  INSERT INTO "user" (id, firstname, lastname, email, title, type) VALUES ('c3fef2d3-9250-4751-9ad4-dd112556e818', 'Loïc', 'Dörr', 'doerrl@dhbw-loerrach.de', null, 'base');
  INSERT INTO "user" (id, firstname, lastname, email, title, type) VALUES ('a4e5bb22-11c3-411c-bd92-665e7ef47629', 'Daniel', 'Riesterer', 'riesterer@example.com', null, 'base');
'''

databaseConnection.executeQuery(insert_user_table_query)
databaseConnection.executeQuery(insert_project_table_query)
databaseConnection.executeQuery(insert_project_user_rel_table_query)
databaseConnection.executeQuery(insert_project_rate_table_query)
databaseConnection.executeQuery(insert_comment_table_query)
databaseConnection.executeQuery(insert_project_project_rel_table_query)
databaseConnection.executeQuery(insert_user_data_query)

databaseConnection.close()

print('Initial-Up Succesfull executed!')