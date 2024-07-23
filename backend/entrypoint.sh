#!/bin/bash

# Wait for the PostgreSQL server to be available
echo "Waiting for postgres..."
while ! nc -z postgres 5432; do
  sleep 0.1
done
echo "PostgreSQL started"

# Run Prisma migrations
echo "Running migrations..."
npx prisma migrate deploy

# Populate the database with initial data on first run
echo "Populating the database with initial data..."
node /usr/src/app/src/utils/populateAssets.ts

# Start your application
echo "Starting the application..."
node /usr/src/app/dist/main
