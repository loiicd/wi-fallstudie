from databaseConnection import DatabaseConnection


databaseConnection = DatabaseConnection()

query = 'ALTER TABLE project_rate DROP COLUMN section;'

databaseConnection.executeQuery(query)

databaseConnection.close()

print('Migration-03-Down Succesfull executed!')