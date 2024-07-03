

import os
from fastapi import HTTPException
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

def append_new_line(file_name, text_to_append):
    with open(file_name, "a+", encoding="utf-8", errors="ignore") as file_object:
        file_object.seek(0)
        data = file_object.read(100)
        if len(data) > 0:
            file_object.write("\n")
        file_object.write(text_to_append)
        
def create_job(date, access_token):
    append_new_line(r'job.txt', str(date)+'--'+str(access_token))
    if True:
        return {'good': 'good'}
    
def remove_file(file_path):
    try:
        os.remove(file_path)
        print(f"The file {file_path} has been removed.")
    except FileNotFoundError:
        print(f"The file {file_path} does not exist.")
    except PermissionError:
        print(f"Permission denied to remove the file {file_path}.")
    except Exception as e:
        print(f"An error occurred while trying to remove the file {file_path}: {e}")
        
        
def verify(token):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM users WHERE token = %s', (token,))
    row = cur.fetchone()
    if row is None:
        print('Token not found')
        raise HTTPException(status_code=404, detail="User not found")
    if row:
        print(row)
        remove_file('job.txt')
        print('File job delete')
    #user = User(id=row[0], name=row[1], email=row[2], iat=row[3], exp=row[4], role=row[5], token=row[6])
    cur.close()
    conn.close()
    return {"status": "ok"}