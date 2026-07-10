# Dockerize a Node.js app

## Step 1: Create Node.js Application
```bash
mkdir node-app
cd node-app
npm init -y  # Creates a default package.json file (no dependencies installed yet)
```
Create server.js    

npm install express


## Step 2: Write a Dockerfile
The Dockerfile tells Docker how to build the environment for app
Filename: Dockerfile
```bash
FROM node:18-alpine → lightweight Node.js image.
WORKDIR /app → sets working directory inside container.
COPY package.json ./* → copy dependency files first (better caching).
RUN npm install → install dependencies.
COPY . . → copy app code.
EXPOSE 4000 → app runs on port 3000.
CMD ["node", "server.js"] → starts the app.
```

## Step 3: Build the Docker Image
Packages the app into a Docker image


## Step 4: Run the Container
Starts the app inside Docker

###Open http://localhost:4000 → app running
 

# Docker Hub Workflow

## Push Image to Docker Hub
```bash
docker login
docker tag node-app your-username/node-app:latest
docker push your-username/node-app:latest
```

## Pull & Run Anywhere
```bash
docker pull your-username/node-app:latest
docker run -p 4000:4000 your-username/node-app:latest
```



