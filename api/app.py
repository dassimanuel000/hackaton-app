
import sys
import os

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from typing import List
import uvicorn
from constants import  PORT_USE
from database.apiUser import SimpleInfo, User


from function import authentifaction, get_db_connection
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Home route
@app.get("/")
async def read_home():
    return {"message": "Welcome to the Home Page"}

# Post route to handle simple info
@app.post("/login/")
async def login(info: SimpleInfo):
    
    permalink = info.permalink
    access_token = "your_access_token_here"
    media_id_info = authentifaction(permalink, access_token)

    if media_id_info:
        print(f"Media ID: {media_id_info}")
        return media_id_info
    else:
        print("Failed to retrieve media ID.")
        raise HTTPException(status_code=400, detail="Failed download ")


# CRUD Routes for Users

@app.post("/users/", response_model=User)
async def create_user(user: User):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        'INSERT INTO users (name, email, iat, exp, role, token) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id',
        (user.name, user.email, user.iat, user.exp, user.role, user.token)
    )
    user_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    user.id = user_id
    return user

@app.get("/users/", response_model=List[User])
async def read_users():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM users')
    rows = cur.fetchall()
    users = []
    for row in rows:
        users.append(User(id=row[0], name=row[1], email=row[2], iat=row[3], exp=row[4], role=row[5], token=row[6]))
    cur.close()
    conn.close()
    return users

@app.get("/users/{user_id}", response_model=User)
async def read_user(user_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM users WHERE id = %s', (user_id,))
    row = cur.fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="User not found")
    user = User(id=row[0], name=row[1], email=row[2], iat=row[3], exp=row[4], role=row[5], token=row[6])
    cur.close()
    conn.close()
    return user

@app.put("/users/{user_id}", response_model=User)
async def update_user(user_id: int, user: User):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        'UPDATE users SET name = %s, email = %s, iat = %s, exp = %s, role = %s, token = %s WHERE id = %s',
        (user.name, user.email, user.iat, user.exp, user.role, user.token, user_id)
    )
    conn.commit()
    cur.close()
    conn.close()
    user.id = user_id
    return user

@app.delete("/users/{user_id}")
async def delete_user(user_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM users WHERE id = %s', (user_id,))
    conn.commit()
    cur.close()
    conn.close()
    return {"message": "User deleted successfully"}


if __name__ == "__main__":
    uvicorn.run("app:app", port=PORT_USE, log_level="info")