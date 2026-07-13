# Dockerize a React App (Single-Stage)

## Step 1: Create React Application
```bash
mkdir react-app
cd react-app
npx create-react-app my-react-app
cd my-react-app
```
This installs a React project with all dependencies.

## Step 2: Build the React App
```bash
npm run build
```
Compiles React JSX into static HTML, CSS, and JS inside the build/ folder.

## Step 3: Write a Dockerfile
Filename: Dockerfile
```bash
FROM node:18-alpine          # lightweight Node.js image
WORKDIR /app                 # sets working directory inside container
COPY package*.json ./        # copy dependency files first (better caching)
RUN npm install              # install dependencies
COPY . .                     # copy app code
RUN npm run build            # compiles React into static files
RUN npm install -g serve     # installs serve to serve static files
EXPOSE 3000                  # app runs on port 3000
CMD ["serve", "-s", "build", "-l", "3000"]  # starts the app
```

## Step 4: Build the Docker Image
```bash
docker build -t react-app .
```
Packages the React app into a Docker image.

## Step 5: Run the Container
```bash
docker run -p 3000:3000 react-app
```
Maps container port 3000 → host port 3000.
#### Open http://localhost:3000 → React app running.

# Docker Hub Workflow
## Push Image to Docker Hub
```bash
docker login
docker tag react-app your-username/react-app:latest
docker push your-username/react-app:latest
```

## Pull & Run Anywhere
```bash
docker pull your-username/react-app:latest
docker run -p 3000:3000 your-username/react-app:latest
```

