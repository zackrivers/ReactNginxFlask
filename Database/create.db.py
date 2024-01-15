import sqlite3
conn = sqlite3.connect('/home/jason/Desktop/Database/SQLDB/database.db')

c = conn.cursor()

# Create table
c.execute('''CREATE TABLE data
             (id INTEGER PRIMARY KEY, text TEXT)''')

# Save (commit) the changes
conn.commit()

# Close the connection
conn.close()
