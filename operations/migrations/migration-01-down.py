from databaseConnection import DatabaseConnection

databaseConnection = DatabaseConnection()

drop_project_ressource_rel_table_query = 'DROP TABLE project_ressource_rel'

databaseConnection.executeQuery(drop_project_ressource_rel_table_query)

databaseConnection.close()

print('Migration-01-Down Succesfull executed!')