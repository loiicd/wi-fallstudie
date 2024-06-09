from databaseConnection import DatabaseConnection


databaseConnection = DatabaseConnection()

alter_project_rate_table_query = 'ALTER TABLE project DROP COLUMN auftraggeber_id;'

databaseConnection.executeQuery(alter_project_rate_table_query)

databaseConnection.close()

print('Migration-02-Down Succesfull executed!')