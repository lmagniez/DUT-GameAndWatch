import sqlite3
conn = sqlite3.connect('ma_base.db')

cursor = conn.cursor()
cursor.execute("""
    CREATE TABLE IF NOT EXISTS scores(
         id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
         name TEXT,
         score INTERGER
    )
    """)
conn.commit()

cursor.execute("""
INSERT INTO scores(name, score) VALUES(?, ?)""", ("Maxime", 120))

cursor.execute("""SELECT name, score FROM scores""")
user1 = cursor.fetchone()
print(user1)

conn.close()
