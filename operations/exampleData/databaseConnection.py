import psycopg2


class DatabaseConnection:
  def __init__(self):
    self.credentials = {
      "host": "ep-white-cherry-a2c84swm-pooler.eu-central-1.aws.neon.tech",
      "database": "verceldb",
      "user": "default",
      "password": "AzSgC86UWluM"
    }
    self.conn = None
    self.cur = None
    self.__connect()

  def __connect(self):
    print('Try to connect')
    conn = psycopg2.connect(
      host = self.credentials['host'],
      database = self.credentials['database'],
      user = self.credentials['user'],
      password = self.credentials['password']
    )
    self.conn = conn
    self.cur = conn.cursor()
    print('Conneted to Database')

  def executeQuery(self, query: str):
    self.cur.execute(query)
    self.conn.commit()
    print('Query executed')

  def close(self):
    self.cur.close()
    self.conn.close()
    print('Database connection closed')
