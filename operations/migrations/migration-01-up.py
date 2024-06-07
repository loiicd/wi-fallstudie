from databaseConnection import DatabaseConnection


databaseConnection = DatabaseConnection()

insert_project_ressource_rel_table_query = '''
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
'''

databaseConnection.executeQuery(insert_project_ressource_rel_table_query)

databaseConnection.close()

print('Migration-01-Up Succesfull executed!')