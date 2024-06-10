from databaseConnection import DatabaseConnection


databaseConnection = DatabaseConnection()

query = "ALTER TABLE project_rate ADD COLUMN section text NOT NULL DEFAULT 'general';"

databaseConnection.executeQuery(query)

databaseConnection.close()

print('Migration-03-Up Succesfull executed!')