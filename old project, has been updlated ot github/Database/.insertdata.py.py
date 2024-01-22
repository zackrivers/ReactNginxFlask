import sqlite3
conn = sqlite3.connect('/home/jason/Desktop/Database/SQLDB/database.db')

c = conn.cursor()

# Insert multiple rows of data
dummy_data = [(2, 'Test 2'), (3, 'Test 3'), (4, 'Test 4')]
c.executemany('INSERT INTO data VALUES (?,?)', dummy_data)

# Save (commit) the changes
conn.commit()

# Close the connection
conn.close()