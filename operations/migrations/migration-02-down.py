from databaseConnection import DatabaseConnection


databaseConnection = DatabaseConnection()

query = 'ALTER TABLE project DROP COLUMN auftraggeber_id;'

databaseConnection.executeQuery(query)

databaseConnection.close()

print('Migration-02-Down Succesfull executed!')