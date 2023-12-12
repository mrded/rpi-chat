# Stage 1: Build
FROM node:18-slim AS build

# Set working directory
WORKDIR /src

# Explicitly copy only package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Set environment variables for build
ENV NODE_ENV=development
ENV REACT_APP_COUCH_HOST=http://10.0.0.1:5984

# Build the project
RUN npm run build

# Stage 2: Production
FROM node:18-slim

# Set working directory
WORKDIR /src

# Copy built assets from build stage
COPY --from=build /src/build ./build
COPY --from=build /src/backend.js ./
COPY --from=build /src/package.json ./

# Set environment variable for production
ENV NODE_ENV=production
ENV PORT 80

# Install only production dependencies
RUN npm install --loglevel verbose

EXPOSE 80

CMD ["npm", "start"]
