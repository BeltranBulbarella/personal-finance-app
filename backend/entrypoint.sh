#!/bin/bash

# Wait for the PostgreSQL server to be available
echo "Waiting for postgres..."
while ! nc -z postgres 5432; do
  sleep 0.1
done
echo "PostgreSQL started"

# Run Prisma migrations
npx prisma migrate deploy

# Start your application
node dist/main
