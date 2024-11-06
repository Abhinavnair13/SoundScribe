# Step 1: Use a Node image to build the Vite app
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Step 2: Use an Nginx image to serve the built app
FROM nginx:alpine

# Copy the build files to the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the app to be accessed
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
