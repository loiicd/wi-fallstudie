from databaseConnection import DatabaseConnection


databaseConnection = DatabaseConnection()

delete_user_table_query = 'DROP TABLE "user"'

delete_project_table_query = 'DROP TABLE project'

delete_project_user_rel_table_query = 'DROP TABLE project_user_rel'

delete_project_rate_table_query = 'DROP TABLE project_rate'

delete_comment_table_query = 'DROP TABLE comment'

delete_project_project_rel_table_query = 'DROP TABLE project_project_relation'

databaseConnection.executeQuery(delete_project_project_rel_table_query)
databaseConnection.executeQuery(delete_comment_table_query)
databaseConnection.executeQuery(delete_project_rate_table_query)
databaseConnection.executeQuery(delete_project_user_rel_table_query)
databaseConnection.executeQuery(delete_project_table_query)
databaseConnection.executeQuery(delete_user_table_query)

databaseConnection.close()

print('Initial-Down Succesfull executed!')