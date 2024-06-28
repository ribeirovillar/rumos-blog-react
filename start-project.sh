#!/bin/bash

# Project Repositories
BACKEND_REPO_URL="https://github.com/ribeirovillar/rumos-blog-backend.git"
FRONTEND_REPO_URL="https://github.com/ribeirovillar/rumos-blog-react.git"

# Clone the Repositories
git clone $BACKEND_REPO_URL
git clone $FRONTEND_REPO_URL

# Change to the backend directory
cd rumos-blog-backend

# Start the backend and database services
docker-compose up -d

# Back to the root directory
cd ..

# Change to the frontend directory
cd rumos-blog-react

# Install the dependencies and start the frontend
npm install
npm start