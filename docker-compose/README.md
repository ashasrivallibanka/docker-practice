# Full Stack Task Manager with Docker Compose

This project is a **Task Manager application** built with:
- **Frontend**: React
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Orchestration**: Docker Compose

The goal of this project is to demonstrate how to containerize a full stack application and run it seamlessly with Docker Compose. It also implements basic CRUD functionality to make it a complete end-to-end application.


## Project Structure
```bash
docker-compose/
│── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── models/Task.js
│── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── public/index.html
│   └── src/
│       ├── index.js
│       └── App.js
│── docker-compose.yml
```

## Steps to Run

### Step 1: Backend Setup
- **package.json** → Defines dependencies (`express`, `mongoose`, `cors`).
- **server.js** → Starts Express server, connects to MongoDB, defines API routes.
- **models/Task.js** → MongoDB schema for tasks.
- **Dockerfile** → Containerizes backend, exposes port `5000`.


### Step 2: Frontend Setup
- **public/index.html** → Static HTML shell with `<div id="root"></div>`.
- **src/index.js** → Entry point, attaches React app to `root`.
- **src/App.js** → Main component, fetches backend data, allows adding and deleting tasks.
- **Dockerfile** → Containerizes frontend, exposes port `3000`.


### Step 3: Docker Compose Setup
```yaml
version: '3.9'

services:
  mongo:
    image: mongo:7
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  backend:
    build: ./backend
    container_name: task-backend
    ports:
      - "5000:5000"
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    container_name: task-frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  mongo_data:
```


## Running the Application
docker-compose build   #Build Images
docker-compose up      #Start Containers
docker ps              #Verify
docker-compose down    #Stop Everything


## Access
Frontend → http://localhost:3000
Backend → http://localhost:5000  





