

import psycopg2

def get_db_connection():
    conn = psycopg2.connect(
        host="51.83.77.248", 
        database="mydatabase",
        user="groupe27",
        password="groupe27"
    )
    return conn

def init_db():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100),
            iat VARCHAR(100),
            exp VARCHAR(100),
            role VARCHAR(50),
            token VARCHAR(255)
        )
    ''')
    conn.commit()
    cur.close()
    conn.close()

def authentifaction():
    print("53")
    return 'e'