from databaseConnection import DatabaseConnection


databaseConnection = DatabaseConnection()

query = 'ALTER TABLE project ADD COLUMN auftraggeber_id text;'

databaseConnection.executeQuery(query)

databaseConnection.close()

print('Migration-02-Up Succesfull executed!')