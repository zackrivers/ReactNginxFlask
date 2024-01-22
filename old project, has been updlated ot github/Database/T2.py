import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('/home/jason/Desktop/Database/SQLDB/database.db')

# Create a cursor object
c = conn.cursor()

# Create a new table
c.execute('''
    CREATE TABLE new_data (
        id INTEGER PRIMARY KEY,
        customer_number INTEGER,
        user_name TEXT,
        column_4 TEXT,
        column_5 TEXT
    )
''')

# Commit the changes and close the connection
conn.commit()
conn.close()
