# Dockerize a React App (Multi-Stage Build)

## Step 1: Create React Application
```bash
npx create-react-app multistage-react-app
cd multistage-react-app
```
This installs a React project with all dependencies.

## Step 2: Build the React App
```bash
npm run build
```
Compiles React JSX into static HTML, CSS, and JS inside the build/ folder.

## Step 3: Write a Multi-Stage Dockerfile
Filename: Dockerfile
```bash
# Stage 1: Build React app
FROM node:18-alpine AS build  # lightweight Node.js image for building.
WORKDIR /app                  # working directory inside container.
COPY package*.json ./         # copy dependency files first
RUN npm install               # install dependencies.
COPY . .                      # copy app code.
RUN npm run build             # compile React into static files (build/).

# Stage 2: Serve with Nginx
FROM nginx:alpine             # lightweight Nginx image for serving static files.
COPY --from=build /app/build /usr/share/nginx/html  # copy compiled files from build stage into Nginx’s default serving directory.
EXPOSE 80                     # container listens on port 80.
CMD ["nginx", "-g", "daemon off;"]                  # run Nginx in foreground.
```

## Step 4: Build the Docker Image
```bash
docker build -t react-app-multi .
```
Packages the React app into a multi-stage optimized image.

## Step 5: Run the Container
```bash
docker run -p 8080:80 react-app-multi
```
Maps container port 80 → host port 8080.
### Open http://localhost:8080 → React app running.

# Docker Hub Workflow
## Push Image to Docker Hub
```bash
docker login
docker tag react-app-multi your-username/react-app-multi:latest
docker push your-username/react-app-multi:latest
```

## Pull & Run Anywhere
```bash
docker pull your-username/react-app-multi:latest
docker run -p 8080:80 your-username/react-app-multi:latest
```

