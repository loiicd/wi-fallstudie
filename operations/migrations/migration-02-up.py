from databaseConnection import DatabaseConnection


databaseConnection = DatabaseConnection()

alter_project_rate_table_query = '''
  ALTER TABLE project_rate
'''

databaseConnection.executeQuery(alter_project_rate_table_query)

databaseConnection.close()

print('Migration-02-Up Succesfull executed!')